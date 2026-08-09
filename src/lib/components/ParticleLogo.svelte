<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let reducedMotion = false;

  onMount(() => {
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx = context;

    const particles: { x: number; y: number; tx: number; ty: number; size: number; phase: number }[] = [];
    const pointer = { x: -1000, y: -1000 };
    let distortionRadius = 1;
    const image = new Image();
    image.src = '/assets/logos/logo.png';
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (image.complete) createParticles(rect.width, rect.height);
    }

    function createParticles(width: number, height: number) {
      const size = Math.min(500, height * 0.9, width * 0.7);
      const left = Math.max(0, Math.min(width - size, (width - size) / 2 + 30));
      const top = (height - size) / 2;
      const sample = document.createElement('canvas');
      sample.width = 256;
      sample.height = 256;
      const sampleContext = sample.getContext('2d');
      if (!sampleContext) return;
      sampleContext.drawImage(image, 0, 0, 256, 256);
      const pixels = sampleContext.getImageData(0, 0, 256, 256).data;
      particles.length = 0;
      for (let x = 0; x < 256; x += 4) {
        for (let y = 0; y < 256; y += 4) {
          if (pixels[(x + y * 256) * 4 + 3] > 120) {
            const tx = left + (x / 256) * size;
            const ty = top + (y / 256) * size;
            particles.push({
              x: tx + (Math.random() - 0.5) * 40,
              y: ty + (Math.random() - 0.5) * 40,
              tx,
              ty,
              size: Math.random() * 2.2 + 1,
              phase: Math.random() * Math.PI * 2
            });
          }
        }
      }
    }

    function render(time = 0) {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);
      const nearby: { x: number; y: number; distance: number }[] = [];
      for (const particle of particles) {
        if (!reducedMotion) {
          particle.x += (particle.tx - particle.x) * 0.035;
          particle.y += (particle.ty - particle.y) * 0.035;
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 180) nearby.push({ x: particle.x, y: particle.y, distance });
          if (distance < distortionRadius * 70 && distance > 0) {
            const force = (1 - distance / (distortionRadius * 70)) * 4;
            particle.x += (dx / distance) * force;
            particle.y += (dy / distance) * force;
          }
        } else {
          particle.x = particle.tx;
          particle.y = particle.ty;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${0.48 + Math.sin(time / 900 + particle.phase) * 0.16})`;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      }
      if (!reducedMotion && nearby.length > 1) {
        ctx.lineWidth = 0.65;
        for (let i = 0; i < nearby.length; i += 1) {
          for (let j = i + 1; j < nearby.length && j < i + 12; j += 1) {
            const a = nearby[i];
            const b = nearby[j];
            const distance = Math.hypot(a.x - b.x, a.y - b.y);
            if (distance < 76) {
              ctx.strokeStyle = `rgba(255, 107, 44, ${0.12 * (1 - distance / 76)})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
      if (!reducedMotion) requestAnimationFrame(render);
    }

    image.onload = resize;
    resize();
    render();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    window.addEventListener('pointermove', move);
    const click = () => {
      distortionRadius = distortionRadius >= 4 ? 1 : distortionRadius + 1;
    };
    window.addEventListener('click', click);
    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('click', click);
    };
  });
</script>

<canvas bind:this={canvas} class="particle-logo" aria-label="Animated SLHS CS Club logo"></canvas>

<style>
  .particle-logo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.9;
    pointer-events: none;
  }
</style>
