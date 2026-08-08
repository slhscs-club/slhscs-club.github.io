<script lang="ts">
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import type { Snippet } from 'svelte';

  let {
    activePage = 'home',
    children
  }: {
    activePage?: string;
    children?: Snippet;
  } = $props();
</script>

<Header {activePage} />

<main class="main-shell">
  {@render children?.()}
</main>

<Footer />