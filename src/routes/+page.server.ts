import type { PageServerLoad } from './$types';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { parseICS, type ICSEvent } from '$lib/ics';

const ICS_URL = 'https://calendar.google.com/calendar/ical/bee0a4ff591a63c015084a9d2770b82ca06813f1c223c6077b688f537cc6cde1%40group.calendar.google.com/public/basic.ics';

function seededRandom(seed: number): () => number {
  let x = seed;
  return () => {
    x = (x * 16807) % 2147483647;
    return x / 2147483647;
  };
}

function selectHighlights(images: { src: string; alt: string; date: number }[], count: number, seed: number): { src: string; alt: string }[] {
  if (images.length <= count) return images.map(({ date, ...img }) => img);
  
  const random = seededRandom(seed);
  const selected: number[] = [];
  const result: { src: string; alt: string }[] = [];
  
  while (selected.length < count) {
    const index = Math.floor(random() * images.length);
    if (!selected.includes(index)) {
      selected.push(index);
      result.push({ src: images[index].src, alt: images[index].alt });
    }
  }
  
  return result;
}

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

  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const highlightCount = Math.min(4, galleryImages.length);
  const highlights = selectHighlights(galleryImages, highlightCount, seed);

  // Fetch ICS events server-side (avoids CORS issues)
  let events: ICSEvent[] = [];
  try {
    const response = await fetch(ICS_URL);
    if (response.ok) {
      const icsText = await response.text();
      const allEvents = parseICS(icsText);
      const now = new Date();
      events = allEvents
        .filter((e) => e.start >= now)
        .sort((a, b) => a.start.getTime() - b.start.getTime())
        .slice(0, 4);
    }
  } catch (e) {
    console.error('Could not fetch calendar events:', e);
  }

  return {
    highlights,
    events: events.map((e) => ({
      summary: e.summary,
      description: e.description,
      start: e.start.toISOString()
    }))
  };
};