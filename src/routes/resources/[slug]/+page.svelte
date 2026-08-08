<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  const { resource } = data;
</script>

<svelte:head>
  <title>{resource.title} | SLHS CS Club</title>
  <meta name="description" content="View resource from Seven Lakes High School Computer Science Club." />
</svelte:head>

<Shell activePage="resources">
  <PageHero title={resource.title} subtitle={resource.type} />

  <section class="section">
    <div class="container">
      {#if !resource.isBinary && resource.rendered}
        <div class="article-body">
          <div class="markdown-content">
            {@html resource.rendered}
          </div>
        </div>
        <div class="resource-actions">
          <a class="btn btn-secondary" href="/resources">
            <i class="fa-solid fa-arrow-left"></i> Back to Resources
          </a>
        </div>
      {:else if resource.filename.endsWith('.pdf') || resource.filename.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)}
        <div class="resource-viewer">
          {#if resource.filename.endsWith('.pdf')}
            <iframe src="{resource.url}" class="pdf-viewer" title="{resource.title}"></iframe>
            <div class="resource-actions">
              <a class="btn btn-primary" href="{resource.url}" target="_blank" rel="noopener">
                <i class="fa-solid fa-external-link"></i> Open in New Tab
              </a>
            </div>
          {:else}
            <div class="image-viewer">
              <img src="{resource.url}" alt="{resource.title}" />
            </div>
            <div class="resource-actions">
              <a class="btn btn-primary" href="{resource.url}" target="_blank" rel="noopener">
                <i class="fa-solid fa-download"></i> Download Image
              </a>
            </div>
          {/if}
          <div class="resource-actions">
            <a class="btn btn-secondary" href="/resources">
              <i class="fa-solid fa-arrow-left"></i> Back to Resources
            </a>
          </div>
        </div>
      {:else}
        <div class="resource-viewer">
          <div class="resource-placeholder">
            <i class="fa-solid fa-file"></i>
            <p>This file type cannot be previewed directly. Click below to download.</p>
            <div class="resource-actions" style="margin-top: 2rem;">
              <a class="btn btn-primary" href="{resource.url}" download>
                <i class="fa-solid fa-download"></i> Download File
              </a>
              <a class="btn btn-secondary" href="/resources">
                <i class="fa-solid fa-arrow-left"></i> Back to Resources
              </a>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </section>
</Shell>

<style>
  .article-body {
    max-width: 900px;
    margin: 0 auto 1.5rem;
    background: var(--color-surface);
    border: 3px solid var(--color-orange);
    color: var(--color-text);
    padding: 2rem;
  }

  .resource-viewer {
    max-width: 900px;
    margin: 0 auto;
    background: var(--color-surface);
    border: 3px solid var(--color-white);
    color: var(--color-text);
    padding: 2rem;
  }

  .pdf-viewer {
    width: 100%;
    height: 75vh;
    min-height: 500px;
    border: 3px solid var(--color-text-muted);
    background: var(--color-bg);
    margin-bottom: 1.5rem;
  }

  .image-viewer {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .image-viewer img {
    max-width: 100%;
    max-height: 75vh;
    object-fit: contain;
    border: 3px solid var(--color-text-muted);
  }

  .markdown-content {
    line-height: 1.6;
  }

  .markdown-content :global(h1), .markdown-content :global(h2), .markdown-content :global(h3) {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    font-family: var(--font-title);
  }

  .markdown-content :global(h1) { font-size: 2rem; }
  .markdown-content :global(h2) { font-size: 1.5rem; }
  .markdown-content :global(h3) { font-size: 1.25rem; }

  .markdown-content :global(p) {
    margin: 1rem 0;
  }

  .markdown-content :global(a) {
    color: var(--color-orange);
    text-decoration: underline;
  }

  .markdown-content :global(code) {
    background: var(--color-surface-2);
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: var(--font-mono);
    font-size: 0.9em;
  }

  .markdown-content :global(pre) {
    background: var(--color-surface-2);
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
    margin: 1rem 0;
  }

  .markdown-content :global(pre) :global(code) {
    background: transparent;
    padding: 0;
  }

  .markdown-content :global(ul), .markdown-content :global(ol) {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  .markdown-content :global(li) {
    margin: 0.5rem 0;
  }

  .resource-placeholder {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--color-text-muted);
  }

  .resource-placeholder i {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .resource-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
  }
</style>