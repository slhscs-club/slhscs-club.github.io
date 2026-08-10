/** Auto-degrades visual features based on device capability and frame budget. */

export type PerfTier = 'full' | 'reduced' | 'lite';

let tier: PerfTier = 'full';
let fpsSamples: number[] = [];
let lastSample = 0;
let degraded = false;

function detect(): PerfTier {
  if (typeof window === 'undefined') return 'full';
  const w = window.innerWidth;
  if (w < 600) return 'lite';
  const mem = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  if ((mem !== undefined && mem < 4) || (cores && cores < 4)) return 'reduced';
  return 'full';
}

export function perfTier(): PerfTier {
  return tier;
}

export function isLite(): boolean {
  return tier === 'lite';
}

export function initPerf() {
  tier = detect();
  if (tier === 'lite') {
    document.documentElement.classList.add('perf-lite');
  }

  // Monitor FPS and auto-degrade if struggling
  let lastFrame = performance.now();
  function tick() {
    const now = performance.now();
    const dt = now - lastFrame;
    lastFrame = now;
    if (dt > 0) fpsSamples.push(1000 / dt);
    if (fpsSamples.length > 60) fpsSamples.shift();
    // Check every 3s
    if (now - lastSample > 3000 && fpsSamples.length >= 30) {
      lastSample = now;
      const avg = fpsSamples.reduce((a, b) => a + b, 0) / fpsSamples.length;
      if (avg < 35 && tier === 'full') {
        tier = 'reduced';
        document.documentElement.classList.add('perf-reduced');
      } else if (avg < 20 && tier === 'reduced') {
        tier = 'lite';
        document.documentElement.classList.add('perf-lite');
      }
      fpsSamples = [];
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
