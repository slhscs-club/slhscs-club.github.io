<script lang="ts">
	import { onMount } from 'svelte';
	import type { LightboxImage } from '$lib/lightbox';

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

	let mounted = $state(false);
	onMount(() => { mounted = true; });

	function handleOpen(item: LightboxImage) {
		if (onOpen) onOpen({ src: item.src, alt: item.alt });
	}
</script>

<div class="masonry" class:ready={mounted}>
	{#if images.length > 0}
		{#each images as img, i}
			<button
				class="masonry-card"
				style="animation-delay: {i * 0.04}s"
				aria-label={img.alt || 'Gallery image'}
				onclick={() => handleOpen(img)}
			>
				<div class="masonry-image" style="background-image:url({img.src});">
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
		transform: translateY(20px);
	}

	.masonry.ready .masonry-card {
		animation: mason-in 0.55s cubic-bezier(.2,.8,.2,1) forwards;
	}

	.masonry-card:focus-visible .masonry-image {
		outline: 3px solid var(--color-orange);
		outline-offset: 3px;
	}

	@keyframes mason-in {
		to { opacity: 1; transform: translateY(0); }
	}

	.masonry-image {
		width: 100%;
		border-radius: 8px;
		background-size: cover;
		background-position: center;
		box-shadow: 0 8px 30px -8px rgba(0,0,0,.3);
		transition: transform .6s cubic-bezier(.2,.8,.2,1), filter .6s ease;
		overflow: hidden;
		position: relative;
	}

	.masonry-card:hover .masonry-image {
		transform: scale(1.035) skewX(-1deg);
		filter: saturate(1.15) contrast(1.04) brightness(1.06);
	}

	.masonry-overlay {
		position: absolute;
		inset: 0;
		border-radius: 8px;
		background: linear-gradient(135deg, rgba(255,107,44,0.35), rgba(38,54,80,0.4));
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
