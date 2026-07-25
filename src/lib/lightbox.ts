export interface LightboxImage {
  src: string;
  alt: string;
}

export function openLightbox(image: LightboxImage): LightboxImage {
  return image;
}

export function closeLightbox(): null {
  return null;
}

export function handleLightboxKeydown(e: KeyboardEvent, onClose: () => void) {
  if (e.key === 'Escape') {
    onClose();
  }
}