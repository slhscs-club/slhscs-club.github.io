<script lang="ts">
	import Modal from './Modal.svelte';
	import type { LightboxImage } from '$lib/lightbox';

	let {
		image,
		onClose
	}: {
		image: LightboxImage | null;
		onClose: () => void;
	} = $props();

	function handleOpenChange(open: boolean) {
		if (!open) onClose();
	}
</script>

<Modal
	open={image !== null}
	onOpenChange={handleOpenChange}
	title={image?.alt}
	titleClass="sr-only"
	class="lightbox-dialog"
>
	{#if image}
		<img src={image.src} alt={image.alt} class="lightbox-image" />
		<p class="lightbox-caption">{image.alt}</p>
	{/if}
</Modal>

<style>
	:global(.lightbox-dialog) {
		background: transparent;
		border: none;
		box-shadow: none;
		padding: 0;
		text-align: center;
	}

	.lightbox-image {
		max-width: 90vw;
		max-height: 80vh;
		object-fit: contain;
		display: block;
	}

	.lightbox-caption {
		margin: 1rem 0 0;
		color: var(--color-text-muted);
		font-size: 1rem;
	}
</style>