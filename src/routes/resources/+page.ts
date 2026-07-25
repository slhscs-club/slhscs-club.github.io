import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  const images = import.meta.glob(
    '$lib/assets/resources/*.{png,jpg,jpeg,webp,gif,svg}',
    { eager: true, query: { url: true } }
  );

  const pdfs = import.meta.glob(
    '$lib/assets/resources/*.pdf',
    { eager: true, query: { url: true } }
  );

  const markdownFiles = import.meta.glob(
    '$lib/assets/resources/*.md',
    { eager: true, as: 'raw' }
  );

  type ResourceType = 'PDF' | 'Document' | 'Guide';

  interface Resource {
    slug: string;
    title: string;
    type: ResourceType;
    color: string;
    url: string;
  }

  const getResourceInfo = (filename: string): { type: ResourceType; color: string } => {
    const ext = filename.split('.').pop()?.toLowerCase() ?? '';
    
    if (ext === 'pdf') {
      return { type: 'PDF', color: 'color-orange' };
    }
    if (ext === 'md') {
      return { type: 'Guide', color: 'color-orange' };
    }
    if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext)) {
      return { type: 'Document', color: 'color-orange' };
    }
    
    return { type: 'Document', color: 'color-orange' };
  };

  const convertModules = (modules: Record<string, unknown>): Resource[] => {
    return Object.entries(modules)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, module]) => {
        const filename = path.split('/').pop() ?? '';
        const slug = filename.replace(/\.[^/.]+$/, '').toLowerCase();
        
        const title = slug
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());

        let url: string;
        if (typeof module === 'object' && module !== null && 'default' in module) {
          url = (module as { default: string }).default;
        } else {
          url = path;
        }

        const { type, color } = getResourceInfo(filename);

        return { slug, title, type, color, url };
      });
  };

  const resourceList: Resource[] = [
    ...convertModules(images),
    ...convertModules(pdfs),
    ...convertModules(markdownFiles)
  ].sort((a, b) => a.slug.localeCompare(b.slug));

  return {
    resources: resourceList
  };
};