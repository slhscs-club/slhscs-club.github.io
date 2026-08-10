<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx = context;

    interface Particle {
      x: number; y: number;
      destX: number; destY: number;
      r: number; vx: number; vy: number;
      color: string;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const R = Math.min(devicePixelRatio || 1, 2);
    const colors = ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#c7ccd8', '#c7ccd8'];
    const pointer = { x: -9999, y: -9999 };
    const rect = { left: 0, top: 0, width: 0, height: 0 };
    let radius = 1;
    let particles: Particle[] = [];
    let logoSize = 0, logoLeft = 0, logoTop = 0;
    let cssW = 0, cssH = 0;
    let raf = 0;
    let frozen = true;
    let lastPointerMove = 0;
    let pointerNear = false;

    const image = new Image();
    image.decoding = 'async';
    image.src = '/assets/logos/logo.png';

    function updateRect() {
      const r = canvas.getBoundingClientRect();
      rect.left = r.left; rect.top = r.top;
      rect.width = r.width; rect.height = r.height;
    }

    function geometry() {
      cssW = canvas.clientWidth; cssH = canvas.clientHeight;
      logoSize = Math.min(560, cssH * 0.96, cssW * 0.6);
      logoLeft = Math.max(0, Math.min(cssW - logoSize, (cssW - logoSize) / 2 + 36));
      logoTop = (cssH - logoSize) / 2;
    }

    function drawStaticLogo() {
      geometry();
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.drawImage(image, logoLeft, logoTop, logoSize, logoSize);
    }

    function buildParticles() {
      geometry();
      const sample = document.createElement('canvas');
      sample.width = 512; sample.height = 512;
      const sctx = sample.getContext('2d');
      if (!sctx) return;
      sctx.drawImage(image, 0, 0, 512, 512);
      const data = sctx.getImageData(0, 0, 512, 512).data;
      const step = 5;
      particles = [];
      for (let gx = 0; gx < 512; gx += step) {
        for (let gy = 0; gy < 512; gy += step) {
          if (data[(gx + gy * 512) * 4 + 3] > 25) {
            const destX = logoLeft + (gx / 512) * logoSize;
            const destY = logoTop + (gy / 512) * logoSize;
            // Start at exact destination — logo appears complete immediately.
            particles.push({
              x: destX, y: destY,
              destX, destY,
              r: Math.random() * 2 + 1,
              vx: 0, vy: 0,
              color: colors[(Math.random() * colors.length) | 0]
            });
          }
        }
      }
    }

    function resize() {
      updateRect();
      canvas.width = Math.round(canvas.clientWidth * R);
      canvas.height = Math.round(canvas.clientHeight * R);
      ctx.setTransform(R, 0, 0, R, 0, 0);
      if (image.complete && image.naturalWidth > 0) {
        if (reducedMotion) {
          drawStaticLogo();
        } else {
          drawStaticLogo();        // immediate placeholder
          setTimeout(() => {
            if (!document.hidden) { buildParticles(); start(); }
            // After the static draw settles, gently breathe the logo to life.
            setTimeout(() => {
              if (!frozen) return;
              for (const p of particles) { p.vx += (Math.random() - 0.5) * 0.7; p.vy += (Math.random() - 0.5) * 0.7; }
              start();
            }, 600);
          }, 150);
        }
      }
    }

    function isSettled() {
      for (const p of particles) {
        if ((p.vx < 0 ? -p.vx : p.vx) + (p.vy < 0 ? -p.vy : p.vy) > 0.18) return false;
      }
      return true;
    }

    function render() {
      raf = 0;
      if (frozen) return;
      ctx.clearRect(0, 0, cssW, cssH);
      const now = performance.now();
      const pointerMoving = now - lastPointerMove < 220;
      const push = pointerNear ? radius * 80 : 0;

      // Two-pass render — no allocations per frame.
      ctx.fillStyle = '#ffffff';
      for (const p of particles) {
        // Stiffer spring → faster settle.
        const ax = (p.destX - p.x) / 50;
        const ay = (p.destY - p.y) / 50;
        p.vx += ax; p.vy += ay;
        p.vx *= 0.92; p.vy *= 0.92;
        if (push > 0) {
          const mx = p.x - pointer.x, my = p.y - pointer.y;
          const d2 = mx * mx + my * my;
          if (d2 < push * push && d2 > 1e-6) {
            const d = Math.sqrt(d2);
            const k = (1 - d / push) * 0.8;
            p.vx += (mx / d) * k; p.vy += (my / d) * k;
          }
        }
        p.x += p.vx; p.y += p.vy;
        if (p.color === '#ffffff') ctx.fillRect(p.x, p.y, p.r, p.r);
      }
      ctx.fillStyle = '#c7ccd8';
      for (const p of particles) {
        if (p.color !== '#ffffff') ctx.fillRect(p.x, p.y, p.r, p.r);
      }

      if (pointerNear && pointerMoving) {
        raf = requestAnimationFrame(render);
      } else if (isSettled()) {
        frozen = true;
      } else {
        raf = requestAnimationFrame(render);
      }
    }

    function start() {
      if (reducedMotion || particles.length === 0) return;
      if (!frozen && raf) return;
      frozen = false;
      if (!raf) raf = requestAnimationFrame(render);
    }
    function stop() {
      frozen = true;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    const onVis = () => { if (document.hidden) stop(); else { updateRect(); start(); } };
    const move = (event: PointerEvent) => {
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      lastPointerMove = performance.now();
      const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx, dy = event.clientY - cy;
      const wake = rect.width * 0.9 + 140;
      pointerNear = dx * dx + dy * dy < wake * wake;
      if (pointerNear) start();
    };
    const leave = () => { pointer.x = -9999; pointer.y = -9999; pointerNear = false; };
    const click = () => { if (reducedMotion) return; radius = radius >= 4 ? 1 : radius + 1; start(); };
    const onScroll = updateRect;
    let resizeTimer = 0;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => { if (!document.hidden) resize(); }, 200);
    };

    image.onload = resize;
    resize();
    if (!reducedMotion) start();

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', leave);
    window.addEventListener('click', click);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerleave', leave);
      window.removeEventListener('click', click);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVis);
      if (raf) cancelAnimationFrame(raf);
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
    opacity: 0.92;
    pointer-events: none;
  }
</style>
