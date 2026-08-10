<script lang="ts">
	import type { LightboxImage } from '$lib/lightbox';
	import { onMount } from 'svelte';

	type Props = {
		images: LightboxImage[];
		onOpen?: (img: LightboxImage) => void;
		colorShiftOnHover?: boolean;
	};

	let {
		images,
		onOpen,
		colorShiftOnHover = true
	}: Props = $props();

	let containerEl: HTMLDivElement;
	let observer: IntersectionObserver;

	function handleOpen(item: LightboxImage) {
		if (onOpen) onOpen({ src: item.src, alt: item.alt });
	}

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						try { observer.unobserve(entry.target); } catch (_) {}
					}
				}
			},
			{ rootMargin: '0px 0px 60px 0px', threshold: 0.05 }
		);

		if (containerEl) {
			containerEl.querySelectorAll('.masonry-card:not(.visible)').forEach((el, i) => {
				(el as HTMLElement).style.setProperty('--i', String(i));
				try { observer.observe(el); } catch (_) {}
			});
		}

		return () => observer?.disconnect();
	});
</script>

<div class="masonry" bind:this={containerEl}>
	{#if images.length > 0}
		{#each images as img, i}
			<button
				class="masonry-card"
				aria-label={img.alt || 'Gallery image'}
				onclick={() => handleOpen(img)}
			>
				<div class="masonry-frame">
					<img src={img.src} alt={img.alt} class="masonry-img" loading="lazy" />
					{#if colorShiftOnHover}
						<div class="masonry-overlay"></div>
					{/if}
				</div>
			</button>
		{/each}
	{:else}
		<div class="masonry-empty">
			<i class="fa-solid fa-image"></i>
			<span>No photos yet &mdash; check back soon!</span>
		</div>
	{/if}
</div>

<style>
	.masonry {
		column-count: 5;
		column-gap: 12px;
	}

	.masonry-card {
		break-inside: avoid;
		margin-bottom: 12px;
		display: block;
		width: 100%;
		padding: 0;
		border: none;
		background: none;
		cursor: pointer;
		outline: none;
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.5s cubic-bezier(.2,.8,.2,1), transform 0.5s cubic-bezier(.2,.8,.2,1);
	}

	.masonry-card.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.masonry-card:focus-visible .masonry-frame {
		outline: 3px solid var(--color-orange);
		outline-offset: 3px;
	}

	.masonry-frame {
		position: relative;
		overflow: hidden;
		border-radius: 8px;
		box-shadow: 0 8px 30px -8px rgba(0,0,0,.3);
		transition: transform .6s cubic-bezier(.2,.8,.2,1);
		line-height: 0;
	}

	.masonry-card:hover .masonry-frame {
		transform: scale(1.035) skewX(-1deg);
	}

	.masonry-img {
		display: block;
		width: 100%;
		height: auto;
		max-height: 80vh;
		object-fit: cover;
		transition: filter .6s ease;
	}

	.masonry-card:hover .masonry-img {
		filter: saturate(1.15) contrast(1.04) brightness(1.06);
	}

	.masonry-overlay {
		position: absolute;
		inset: 0;
		border-radius: 8px;
		background: rgba(255,107,44,0.4);
		opacity: 0;
		transition: opacity .4s ease;
		pointer-events: none;
	}

	.masonry-card:hover .masonry-overlay {
		opacity: 0.35;
	}

	.masonry-empty {
		display: grid;
		place-items: center;
		gap: 0.5rem;
		min-height: 12rem;
		border: 3px solid var(--color-orange);
		background: var(--color-orange);
		color: var(--color-black);
		font-size: 0.85rem;
		box-shadow: var(--orange-shadow);
	}

	.masonry-empty i { font-size: 2rem; opacity: 0.5; }

	@media (max-width: 1500px) { .masonry { column-count: 4; } }
	@media (max-width: 1000px) { .masonry { column-count: 3; } }
	@media (max-width: 600px)  { .masonry { column-count: 2; column-gap: 8px; } .masonry-card { margin-bottom: 8px; } }
	@media (max-width: 400px)  { .masonry { column-count: 1; } }
</style>
