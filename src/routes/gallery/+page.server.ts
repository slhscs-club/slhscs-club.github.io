import type { PageServerLoad } from './$types';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export const load: PageServerLoad = async () => {
  const imageModules = import.meta.glob(
    '$lib/assets/gallery/*.{jpg,jpeg,png,gif,webp,avif}',
    { eager: true, query: '?url' }
  );

  const galleryDir = join(process.cwd(), 'src/lib/assets/gallery');

  const fileDates = new Map<string, number>();
  try {
    const files = await readdir(galleryDir);
    await Promise.all(
      files.map(async (file) => {
        const filePath = join(galleryDir, file);
        const stats = await stat(filePath);
        fileDates.set(file, stats.mtime.getTime());
      })
    );
  } catch (e) {
    console.error('Could not read gallery directory for dates:', e);
  }

  const galleryImages = Object.entries(imageModules)
    .map(([path, module]) => {
      const fullFilename = path.split('/').pop() ?? '';
      const filename = fullFilename.replace(/\.[^/.]+$/, '') ?? '';
      const alt = filename
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
      const src = typeof module === 'object' && module !== null && 'default' in module
        ? (module as { default: string }).default
        : path;
      const date = fileDates.get(fullFilename) ?? 0;
      return { src, alt, date };
    })
    .sort((a, b) => b.date - a.date);

  for (let i = galleryImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [galleryImages[i], galleryImages[j]] = [galleryImages[j], galleryImages[i]];
  }

  const outputImages = galleryImages.map(({ date, ...img }) => img);

  return {
    galleryImages: outputImages
  };
};