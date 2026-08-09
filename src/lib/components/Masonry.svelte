<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';
	import type { LightboxImage } from '$lib/lightbox';

	type Props = {
		images: LightboxImage[];
		onOpen?: (img: LightboxImage) => void;
		ease?: string;
		duration?: number;
		stagger?: number;
		animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
		scaleOnHover?: boolean;
		hoverScale?: number;
		blurToFocus?: boolean;
		colorShiftOnHover?: boolean;
	};

	let {
		images,
		onOpen,
		ease = 'power3.out',
		duration = 0.6,
		stagger = 0.05,
		animateFrom = 'bottom',
		scaleOnHover = true,
		hoverScale = 0.95,
		blurToFocus = true,
		colorShiftOnHover = false
	}: Props = $props();

	type Item = { id: string; img: string; url: string; alt: string };
	type GridItem = Item & { x: number; y: number; w: number; h: number };

	let containerRef: HTMLDivElement;
	let width = $state(0);
	let columns = $state(1);
	let imagesReady = $state(false);
	let hasMounted = false;

	/** Natural height/width ratio per card, measured once each image finishes loading. */
	const ratios = $state<Record<string, number>>({});
	const DEFAULT_RATIO = 3 / 5;

	const gap = 16;

	const items = $derived<Item[]>(
		images.map((img, index) => ({ id: String(index), img: img.src, url: img.src, alt: img.alt }))
	);

	function computeColumns() {
		if (typeof window === 'undefined') return 1;
		if (matchMedia('(min-width:1500px)').matches) return 5;
		if (matchMedia('(min-width:1000px)').matches) return 4;
		if (matchMedia('(min-width:600px)').matches) return 3;
		if (matchMedia('(min-width:400px)').matches) return 2;
		return 1;
	}

	/** Places each card into the shortest column, using its measured aspect ratio. */
	const grid = $derived.by<GridItem[]>(() => {
		if (!width) return [];
		const colHeights = new Array(columns).fill(0);
		const totalGaps = (columns - 1) * gap;
		const columnWidth = (width - totalGaps) / columns;
		return items.map((child) => {
			const col = colHeights.indexOf(Math.min(...colHeights));
			const x = col * (columnWidth + gap);
			const height = (ratios[child.id] ?? DEFAULT_RATIO) * columnWidth;
			const y = colHeights[col];
			colHeights[col] += height + gap;
			return { ...child, x, y, w: columnWidth, h: height };
		});
	});

	const containerHeight = $derived(
		grid.length > 0 ? Math.max(...grid.map((item) => item.y + item.h)) + gap : 0
	);

	function getInitialPosition(item: GridItem) {
		const containerRect = containerRef?.getBoundingClientRect();
		if (!containerRect) return { x: item.x, y: item.y };
		let direction = animateFrom;
		if (animateFrom === 'random') {
			const dirs = ['top', 'bottom', 'left', 'right'] as const;
			direction = dirs[Math.floor(Math.random() * dirs.length)];
		}
		switch (direction) {
			case 'top': return { x: item.x, y: -200 };
			case 'bottom': return { x: item.x, y: window.innerHeight + 200 };
			case 'left': return { x: -200, y: item.y };
			case 'right': return { x: window.innerWidth + 200, y: item.y };
			case 'center': return { x: containerRect.width / 2 - item.w / 2, y: containerRect.height / 2 - item.h / 2 };
			default: return { x: item.x, y: item.y + 100 };
		}
	}

	async function preloadAndMeasure() {
		await Promise.all(
			items.map(
				(item) =>
					new Promise<void>((resolve) => {
						const img = new Image();
						let settled = false;
						const finish = () => {
							if (settled) return;
							settled = true;
							resolve();
						};
						img.src = item.img;
						img.onload = () => {
							const ratio = img.naturalHeight / img.naturalWidth;
							ratios[item.id] = Number.isFinite(ratio) && ratio > 0 ? ratio : DEFAULT_RATIO;
							finish();
						};
						img.onerror = finish;
						setTimeout(finish, 10_000);
					})
			)
		);
	}
	$effect(() => {
		void items;
		imagesReady = false;
		preloadAndMeasure().then(() => (imagesReady = true));
	});

	$effect(() => {
		if (!imagesReady || !grid.length) return;
		(async () => {
			await tick();
			grid.forEach((item, index) => {
				const selector = `[data-key="${item.id}"]`;
				const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };
				if (!hasMounted) {
					const start = getInitialPosition(item);
					gsap.fromTo(
						selector,
						{
							opacity: 0,
							x: start.x,
							y: start.y,
							width: item.w,
							height: item.h,
							...(blurToFocus && { filter: 'blur(10px)' })
						},
						{
							opacity: 1,
							...animProps,
							...(blurToFocus && { filter: 'blur(0px)' }),
							duration: 0.8,
							ease: 'power3.out',
							delay: index * stagger
						}
					);
				} else {
					gsap.to(selector, { ...animProps, duration, ease, overwrite: 'auto' });
				}
			});
			hasMounted = true;
		})();
	});

	function handleEnter(id: string, el: HTMLElement) {
		if (scaleOnHover) gsap.to(`[data-key="${id}"]`, { scale: hoverScale, duration: 0.3, ease: 'power2.out' });
		if (colorShiftOnHover) {
			const overlay = el.querySelector('.color-overlay') as HTMLElement | null;
			if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
		}
	}
	function handleLeave(id: string, el: HTMLElement) {
		if (scaleOnHover) gsap.to(`[data-key="${id}"]`, { scale: 1, duration: 0.3, ease: 'power2.out' });
		if (colorShiftOnHover) {
			const overlay = el.querySelector('.color-overlay') as HTMLElement | null;
			if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
		}
	}

	function handleOpen(item: GridItem) {
		if (onOpen) onOpen({ src: item.img, alt: item.alt });
		else window.open(item.url, '_blank', 'noopener');
	}
	function handleKeydown(e: KeyboardEvent, item: GridItem) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleOpen(item);
		}
	}

	onMount(() => {
		columns = computeColumns();
		const queries = ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'];
		const handler = () => (columns = computeColumns());
		queries.forEach((q) => matchMedia(q).addEventListener('change', handler));
		const ro = new ResizeObserver(([entry]) => (width = entry.contentRect.width));
		if (containerRef) ro.observe(containerRef);
		return () => {
			queries.forEach((q) => matchMedia(q).removeEventListener('change', handler));
			ro.disconnect();
		};
	});
</script>

<div bind:this={containerRef} class="masonry" style="height: {containerHeight}px;">
	{#if grid.length > 0}
		{#each grid as item (item.id)}
			<div
				data-key={item.id}
				class="masonry-card"
				role="button"
				tabindex="0"
				aria-label={item.alt || 'Gallery image'}
				onclick={() => handleOpen(item)}
				onkeydown={(e) => handleKeydown(e, item)}
				onmouseenter={(e) => handleEnter(item.id, e.currentTarget)}
				onmouseleave={(e) => handleLeave(item.id, e.currentTarget)}
			>
				<div class="masonry-card-inner" style="background-image:url({item.img});">
					{#if colorShiftOnHover}
						<div class="color-overlay"></div>
					{/if}
				</div>
			</div>
		{/each}
	{:else if images.length > 0}
		<div class="masonry-loading">Loading gallery…</div>
	{:else}
		<div class="masonry-placeholder">
			<i class="fa-solid fa-image"></i>
			<span>No photos yet - check back soon!</span>
		</div>
	{/if}
</div>

<style>
	.masonry {
		position: relative;
		width: 100%;
		will-change: height;
	}

	.masonry-card {
		position: absolute;
		cursor: pointer;
		will-change: transform, width, height, opacity;
		outline: none;
	}

	.masonry-card:focus-visible .masonry-card-inner {
		outline: 3px solid var(--color-orange);
		outline-offset: 3px;
	}

	.masonry-card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		border-radius: 10px;
		box-shadow: 0 10px 50px -10px rgba(0, 0, 0, 0.2);
		overflow: hidden;
		transition: transform .7s cubic-bezier(.2,.8,.2,1), filter .7s ease;
	}

	.masonry-card:hover .masonry-card-inner { transform: scale(1.045) skewX(-1deg); filter: saturate(1.15) contrast(1.04); }

	.color-overlay {
		position: absolute;
		inset: 0;
		border-radius: 10px;
		background: linear-gradient(135deg, rgba(255, 107, 44, 0.45), rgba(21, 35, 63, 0.45));
		opacity: 0;
		pointer-events: none;
	}

	.masonry-loading,
	.masonry-placeholder {
		display: grid;
		place-items: center;
		gap: 0.5rem;
		width: 100%;
		min-height: 12rem;
		border: 3px solid var(--color-orange);
		background: var(--color-orange);
		color: var(--color-black);
		font-size: 0.85rem;
		text-align: center;
		box-shadow: var(--orange-shadow);
	}

	.masonry-placeholder i {
		font-size: 2rem;
		opacity: 0.5;
	}
</style>
