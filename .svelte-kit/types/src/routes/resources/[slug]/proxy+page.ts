// @ts-nocheck
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';

export const load = async ({ params }: Parameters<PageLoad>[0]) => {
  const { slug } = params;

  const imageModules = import.meta.glob(
    '$lib/assets/resources/*.{png,jpg,jpeg,webp,gif,svg}',
    { eager: true, query: { url: true } }
  );

  const pdfModules = import.meta.glob(
    '$lib/assets/resources/*.pdf',
    { eager: true, query: { url: true } }
  );

  const markdownModules = import.meta.glob(
    '$lib/assets/resources/*.md',
    { eager: true, as: 'raw' }
  );

  const findMatchingEntry = (modules: Record<string, unknown>) => {
    return Object.entries(modules).find(([path]) => {
      const filename = path.split('/').pop() ?? '';
      const fileSlug = filename.replace(/\.[^/.]+$/, '').toLowerCase();
      return fileSlug === slug.toLowerCase();
    });
  };

  const matchingEntry = findMatchingEntry(imageModules) 
    ?? findMatchingEntry(pdfModules) 
    ?? findMatchingEntry(markdownModules);

  if (!matchingEntry) {
    throw error(404, 'Resource not found');
  }

  const [path, module] = matchingEntry;
  const filename = path.split('/').pop() ?? '';
  
  let url: string;
  let content: string | undefined;
  let rendered: string | undefined;
  
  if (typeof module === 'object' && module !== null && 'default' in module) {
    url = (module as { default: string }).default;
  } else if (typeof module === 'string') {
    url = path;
    content = module;
    rendered = marked(content) as string;
  } else {
    url = path;
  }

  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  
  const title = slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const getResourceInfo = (ext: string) => {
    if (ext === 'pdf') {
      return { type: 'PDF', icon: 'fa-solid fa-file-pdf', isBinary: true };
    }
    if (ext === 'md') {
      return { type: 'Guide', icon: 'fa-solid fa-book', isBinary: false };
    }
    if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext)) {
      return { type: 'Document', icon: 'fa-solid fa-file-image', isBinary: true };
    }
    return { type: 'Document', icon: 'fa-solid fa-file', isBinary: true };
  };

  const { type, icon, isBinary } = getResourceInfo(ext);

  return {
    resource: {
      slug,
      title,
      type,
      icon,
      url,
      filename,
      rendered,
      isBinary
    }
  };
};