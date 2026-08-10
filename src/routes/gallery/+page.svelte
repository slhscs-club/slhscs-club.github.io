<script lang="ts">
	import Shell from '$lib/components/Shell.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import CTACard from '$lib/components/CTACard.svelte';
	import Masonry from '$lib/components/Masonry.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import type { PageData } from './$types';
	import { openLightbox, closeLightbox, type LightboxImage } from '$lib/lightbox';

	let { data }: { data: PageData } = $props();
	const { galleryImages } = $derived(data);

	let selectedImage: LightboxImage | null = $state(null);

	function onOpenLightbox(img: LightboxImage) {
		selectedImage = openLightbox(img);
	}

	function onCloseLightbox() {
		selectedImage = closeLightbox();
	}
</script>

<svelte:head>
	<title>Gallery | SLHS CS Club</title>
	<meta name="description" content="Photo gallery from the Seven Lakes High School Computer Science Club." />
</svelte:head>

<Shell activePage="gallery">
	<PageHero title="Gallery" subtitle="Photos from our meetings, contests, socials, and events throughout the year." />

	<section class="section">
		<div class="container">
			<Masonry images={galleryImages} onOpen={onOpenLightbox} colorShiftOnHover />
		</div>
	</section>

	<CTACard title="Have photos to share?" lead="Send us your photos from club events and we'll add them to the gallery!">
		<a class="btn btn-primary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Share on Discord</a>
		<a class="btn btn-secondary" href="/"><i class="fa-solid fa-house"></i> Back Home</a>
	</CTACard>
</Shell>

<Lightbox image={selectedImage} onClose={onCloseLightbox} />
