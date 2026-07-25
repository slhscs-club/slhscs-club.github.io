export interface CarouselState {
  currentIndex: number;
  totalSlides: number;
  maxIndex: number;
  dragStartX: number;
  dragDeltaX: number;
  isDragging: boolean;
  dragOffset: number;
}

export function createCarouselState(totalSlides: number, visibleSlides: number = 3): CarouselState {
  return {
    currentIndex: 0,
    totalSlides,
    maxIndex: totalSlides - visibleSlides,
    dragStartX: 0,
    dragDeltaX: 0,
    isDragging: false,
    dragOffset: 0
  };
}

export function goTo(state: CarouselState, index: number): CarouselState {
  return { ...state, currentIndex: Math.max(0, Math.min(index, state.maxIndex)) };
}

export function goNext(state: CarouselState): CarouselState {
  return goTo(state, state.currentIndex + 1);
}

export function goPrev(state: CarouselState): CarouselState {
  return goTo(state, state.currentIndex - 1);
}

export function handleDragStart(state: CarouselState, clientX: number): CarouselState {
  return { ...state, dragStartX: clientX, dragDeltaX: 0, dragOffset: 0, isDragging: true };
}

export function handleDragMove(state: CarouselState, clientX: number): CarouselState {
  if (!state.isDragging) return state;
  const dragDeltaX = clientX - state.dragStartX;
  return { ...state, dragDeltaX, dragOffset: dragDeltaX };
}

export function handleDragEnd(state: CarouselState, slideWidth: number): CarouselState {
  if (!state.isDragging) return state;

  const snappedSlides = Math.round(state.dragDeltaX / -slideWidth);
  let newIndex = state.currentIndex;
  if (snappedSlides !== 0) {
    newIndex = Math.max(0, Math.min(state.currentIndex + snappedSlides, state.maxIndex));
  }

  return {
    ...state,
    currentIndex: newIndex,
    isDragging: false,
    dragOffset: 0,
    dragDeltaX: 0
  };
}

export function getTrackTransform(state: CarouselState, visibleSlides: number = 3): string {
  return `translateX(calc(-${state.currentIndex * (100 / visibleSlides)}% + ${state.dragOffset}px))`;
}