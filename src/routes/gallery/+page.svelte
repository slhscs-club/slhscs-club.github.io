<script lang="ts">
	import Shell from '$lib/components/Shell.svelte';
	import type { PageData } from './$types';
	import { openLightbox, closeLightbox, handleLightboxKeydown, type LightboxImage } from '$lib/lightbox';

	let { data }: { data: PageData } = $props();
	const { galleryImages } = data;

	let selectedImage: LightboxImage | null = $state(null);

	function onOpenLightbox(img: LightboxImage) {
		selectedImage = openLightbox(img);
	}

	function onCloseLightbox() {
		selectedImage = closeLightbox();
	}
</script>

<svelte:window on:keydown={(e) => handleLightboxKeydown(e, onCloseLightbox)} />

<svelte:head>
	<title>Gallery | SLHS CS Club</title>
	<meta name="description" content="Photo gallery from the Seven Lakes High School Computer Science Club." />
</svelte:head>

<Shell activePage="gallery">
	<section class="section gallery-hero">
		<div class="container">
			<h1 class="page-title">Gallery</h1>
			<p class="page-subtitle">Photos from our meetings, contests, socials, and events throughout the year.</p>
		</div>
	</section>

	<section class="section">
		<div class="container">
			{#if galleryImages.length > 0}
				<div class="gallery-grid">
					{#each galleryImages as img}
						<div class="gallery-card" onclick={() => onOpenLightbox(img)}>
							<img src="{img.src}" alt="{img.alt}" loading="lazy" />
						</div>
					{/each}
				</div>
			{:else}
				<div class="gallery-grid">
					<div class="gallery-card">
						<div class="gallery-placeholder">
							<i class="fa-solid fa-image"></i>
							<span>No photos yet - check back soon!</span>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</section>

	<section class="section">
		<div class="container cta-card color-orange">
			<h2 class="section-title">Have photos to share?</h2>
			<p class="section-lead">Send us your photos from club events and we'll add them to the gallery.</p>
			<div class="cta-actions">
				<a class="btn btn-primary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Share on Discord</a>
				<a class="btn btn-secondary" href="/"><i class="fa-solid fa-house"></i> Back Home</a>
			</div>
		</div>
	</section>
</Shell>

{#if selectedImage}
	<div class="lightbox-backdrop" role="button" tabindex="0" onclick={onCloseLightbox} onkeydown={(e) => e.key === 'Enter' || e.key === ' ' ? onCloseLightbox() : null}>
		<div class="lightbox-content" onclick={(e) => e.stopPropagation()}>
			<button class="lightbox-close" onclick={onCloseLightbox} aria-label="Close">
				<i class="fa-solid fa-xmark"></i>
			</button>
			<img src="{selectedImage.src}" alt="{selectedImage.alt}" class="lightbox-image" />
			<p class="lightbox-caption">{selectedImage.alt}</p>
		</div>
	</div>
{/if}

<style>
	.gallery-hero { text-align: center; padding: 6rem 0 2rem; }
	.gallery-hero .page-subtitle { margin-left: auto; margin-right: auto; }
	
	.gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }

	.gallery-card {
		aspect-ratio: 4 / 3;
		border: 3px solid var(--color-orange);
		background: var(--color-orange);
		color: var(--color-black);
		overflow: hidden;
		cursor: pointer;
		box-shadow: var(--orange-shadow);
		transition: transform 0.15s var(--ease-hover), box-shadow 0.15s var(--ease-hover);
	}

	.gallery-card:hover {
		transform: translate(-2px, -2px);
		box-shadow: 5px 5px 0 var(--color-orange);
	}

	.gallery-card img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.gallery-placeholder {
		display: grid; place-items: center; gap: 0.5rem;
		width: 100%; height: 100%; color: inherit;
		font-size: 0.85rem; text-align: center;
	}

	.gallery-placeholder i { font-size: 2rem; opacity: 0.5; }

	.cta-card {
		padding: 2.4rem; text-align: center;
		background: var(--color-surface);
	}
	.cta-actions { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
	.cta-card .section-title, .cta-card .section-lead { margin-left: auto; margin-right: auto; }

	.lightbox-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10000;
		padding: 2rem;
	}

	.lightbox-content {
		position: relative;
		max-width: 90vw;
		max-height: 90vh;
	}

	.lightbox-close {
		position: absolute;
		top: -3rem;
		right: 0;
		width: 2.5rem;
		height: 2.5rem;
		border: 3px solid var(--color-white);
		background: transparent;
		color: var(--color-white);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
	}

	.lightbox-image {
		max-width: 90vw;
		max-height: 90vh;
		object-fit: contain;
		display: block;
	}

	.lightbox-caption {
		margin-top: 1rem;
		text-align: center;
		color: var(--color-text-muted);
		font-size: 1rem;
	}

	@media (max-width: 1024px) { 
		.gallery-grid { grid-template-columns: repeat(2, 1fr); } 
	}
	@media (max-width: 768px) { 
		.gallery-grid { grid-template-columns: 1fr; } 
	}
</style>