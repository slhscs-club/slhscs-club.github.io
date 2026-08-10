<script lang="ts">

  type Props = {
    text?: string;
    src?: string;
    alt?: string;
    tint?: string;
    glow?: number;
    startDelay?: number;
    flicker?: boolean;
    maxLines?: number;
    class?: string;
  };

  let {
    text = '',
    src = '',
    alt = '',
    tint = '#F36A2B',
    glow = 0.6,
    startDelay = 400,
    flicker = true,
    maxLines = 2,
    class: className = ''
  }: Props = $props();

  let canvasEl: HTMLCanvasElement | undefined = $state();
  let ready = $state(false);

  const VERT_SRC = `
    precision mediump float;

    attribute vec2 a_position;
    varying vec2 vUv;

    void main() {
      vUv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const FRAG_SRC = `
    precision mediump float;

    varying vec2 vUv;

    uniform sampler2D u_texture;
    uniform vec2 u_res;      /* output canvas, device pixels             */
    uniform vec2 u_texRes;   /* text texture, device pixels              */
    uniform float u_time;    /* seconds, requestAnimationFrame clock     */
    uniform float u_startTime; /* moment the power-on sequence begins     */
    uniform float u_flicker;   /* 1.0 = alive, 0.0 = still (a11y)         */
    uniform vec3 u_color;      /* segment colour                          */
    uniform float u_glow;      /* phosphor bloom strength                  */
    uniform float u_mode;      /* 0 = mono segmented caption, 1 = image    */

    /*
     * hash21 / hash12 - "Hash without Sine" by Dave Hoskins.
     * https://www.shadertoy.com/view/4djSRW  (MIT)
     */

    float hash21(vec2 p) {
      p = fract(p * vec2(234.34, 435.345));
      p += dot(p, p + 34.23);
      return fract(p.x * p.y);
    }

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    float vnoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
        mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x),
        f.y
      );
    }

    float win(float t, float c, float halfW) {
      return 1.0 - smoothstep(halfW * 0.35, halfW, abs(t - c));
    }

    vec2 spp(vec2 px) {
      return px / u_texRes;
    }

    vec2 loff(float rx, float ry) {
      float S = clamp(u_texRes.y / 140.0, 0.5, 2.5);
      return spp(vec2(rx, ry) * S);
    }

    /* Sample the text's brightness at a pixel offset from the current uv. */
    float probe(vec2 spot, vec2 offset, float w) {
      return w * texture2D(u_texture, spot + offset).a;
    }

    void main() {
      float t = u_time - u_startTime;

      float light = 0.0;
      if (t <= 0.0) {
        light = 0.0;
      } else if (t < 1.7) {
        float slot = floor(t * 14.0);
        float h = hash21(vec2(slot, 7.13));
        float trend = smoothstep(0.0, 1.7, t);
        light = step(h, 0.18 + 0.82 * trend) * trend;
        light *= mix(1.0, step(hash21(vec2(1.0, 3.0)), 0.45), step(t, 0.10));
        light *= 1.0 - 0.88 * win(t, 0.52, 0.11);
        light *= 1.0 - 0.70 * win(t, 0.98, 0.07);
        light *= 1.0 - 0.55 * win(t, 1.35, 0.05);
      } else {
        light = 1.0;
      }

      float sag = 0.94 + 0.06 * vnoise(vec2(t * 1.8, 3.7));
      float cycle = floor(t / 3.4);
      float inCycle = fract(t / 3.4);
      float dipAt = 0.08 + 0.8 * hash21(vec2(cycle, 11.3));
      float dip = 1.0 - 0.34 * win(inCycle, dipAt, 0.06);
      if (u_flicker > 0.5) {
        light *= sag * dip;
      }

      vec4 srcTex = texture2D(u_texture, vUv);
      float c = srcTex.a;

      float caPx = clamp(2.0 + 5.0 * length(vUv - 0.5), 0.0, 9.0);
      float mR = texture2D(u_texture, vUv + spp(vec2( caPx, 0.0))).a;
      float mG = c;
      float mB = texture2D(u_texture, vUv - spp(vec2( caPx, 0.0))).a;

      float flutter = 0.86 + 0.14 * vnoise(vUv * vec2(160.0, 80.0) + vec2(t * 2.6, t * 1.1));

      vec3 litMask = vec3(mR, mG, mB) * light * flutter;
      /* mono captions tint with u_color; colour images keep their hues */
      vec3 baseCol = mix(u_color, srcTex.rgb, u_mode);
      vec3 col = baseCol * litMask;

      float g = 0.0;
      g += probe(vUv, loff( 1.6, 0.0), 0.34);
      g += probe(vUv, loff(-1.6, 0.0), 0.34);
      g += probe(vUv, loff( 0.0, 1.6), 0.30);
      g += probe(vUv, loff( 0.0,-1.6), 0.30);
      g += probe(vUv, loff( 1.1, 1.1), 0.26);
      g += probe(vUv, loff(-1.1, 1.1), 0.26);
      g += probe(vUv, loff( 1.1,-1.1), 0.26);
      g += probe(vUv, loff(-1.1,-1.1), 0.26);
      g += probe(vUv, loff( 3.2, 0.0), 0.15);
      g += probe(vUv, loff(-3.2, 0.0), 0.15);
      g += probe(vUv, loff( 0.0, 3.2), 0.13);
      g += probe(vUv, loff( 0.0,-3.2), 0.13);
      g += probe(vUv, loff( 2.2, 2.2), 0.11);
      g += probe(vUv, loff(-2.2, 2.2), 0.11);
      g += probe(vUv, loff( 2.2,-2.2), 0.11);
      g += probe(vUv, loff(-2.2,-2.2), 0.11);
      g += probe(vUv, loff( 6.5, 0.0), 0.07);
      g += probe(vUv, loff(-6.5, 0.0), 0.07);
      g += probe(vUv, loff( 0.0, 6.5), 0.06);
      g += probe(vUv, loff( 0.0,-6.5), 0.06);
      g += probe(vUv, loff( 4.6, 4.6), 0.05);
      g += probe(vUv, loff(-4.6, 4.6), 0.05);
      g += probe(vUv, loff( 4.6,-4.6), 0.05);
      g += probe(vUv, loff(-4.6,-4.6), 0.05);
      g += probe(vUv, loff( 11.0,  2.5), 0.03);
      g += probe(vUv, loff(-11.0,  2.5), 0.03);
      g += probe(vUv, loff( 11.0, -2.5), 0.03);
      g += probe(vUv, loff(-11.0, -2.5), 0.03);
      g += probe(vUv, loff( 0.0, 11.0), 0.025);
      g += probe(vUv, loff( 0.0,-11.0), 0.025);

      float glowA = g * u_glow * light;

      vec3 glowCol = mix(u_color, srcTex.rgb, u_mode);
      if (u_mode > 0.5) {
        glowCol = max(glowCol, texture2D(u_texture, vUv + loff( 2.5, 0.0)).rgb);
        glowCol = max(glowCol, texture2D(u_texture, vUv + loff(-2.5, 0.0)).rgb);
        glowCol = max(glowCol, texture2D(u_texture, vUv + loff( 0.0, 2.5)).rgb);
        glowCol = max(glowCol, texture2D(u_texture, vUv + loff( 0.0,-2.5)).rgb);
      }
      col += glowCol * glowA;
      col += glowCol * g * 0.04; /* faint ghost bleed across the glass     */

      float coverage = max(max(mR, mG), mB) * light;
      float aOut = clamp(coverage * 0.96 + glowA * 0.95, 0.0, 1.0);

      /* scanlines - one dark line per pixel row */
      col *= 1.0 - 0.30 * pow(abs(sin(vUv.y * u_res.y * 3.14159265)), 1.25);

      if (u_flicker > 0.5) {
        /* film grain, FilmShader-style (three.js) */
        float grain = hash12(vUv * u_res + mod(u_time, 1.0) * 331.0);
        col *= 0.90 + 0.13 * grain;

        /* a slow brightness band rolling down the panel */
        float roll = 1.0 - 0.055 * exp(-pow((vUv.y - fract(u_time * 0.03)) * 22.0, 2.0));
        col *= roll;
      }

      /* vignette - Eskil's technique carried in three.js VignetteShader  */
      vec2 vg = (vUv - 0.5) * 1.32;
      col *= 1.0 - 0.34 * dot(vg, vg);

      /* dust specks and tiny scratches baked into the glass */
      float grime = vnoise(vec2(floor(vUv.x * u_texRes.x * 0.35) * 0.7, floor(vUv.y * u_texRes.y * 0.8)));
      col *= mix(1.0, 0.12, step(0.9966, grime));
      col += u_color * step(0.99925, vnoise(vec2(vUv.x * 137.0 + 7.0, vUv.y * 97.0 - 3.0))) * 0.4;

      gl_FragColor = vec4(col * aOut, aOut);
    }
  `;

  function compileShader(gl: WebGLRenderingContext, source: string, type: number): WebGLShader | null {
    const sh = gl.createShader(type);
    if (!sh) return null;
    gl.shaderSource(sh, source);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn('[SegmentDisplay] shader compile failed:', gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  function linkProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram | null {
    const prog = gl.createProgram();
    if (!prog) return null;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('[SegmentDisplay] program link failed:', gl.getProgramInfoLog(prog));
      gl.deleteProgram(prog);
      return null;
    }
    return prog;
  }

  function hexToRgb(hex: string): number[] {
    const clean = hex.replace('#', '');
    const full = clean.length === 3 ? clean.replace(/./g, (ch) => ch + ch) : clean;
    const n = parseInt(full, 16);
    if (Number.isNaN(n)) return [1, 0.42, 0.17];
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }

  function wrapLines(ctx: CanvasRenderingContext2D, t: string, maxW: number, fontPx: number): string[] {
    const words = t.split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let line = '';
    ctx.font = `${fontPx}px "Seven Segment", monospace`;
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (!line || ctx.measureText(test).width <= maxW) {
        line = test;
      } else {
        lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  function loadImage(src: string): Promise<HTMLImageElement | null> {
    return new Promise((resolve) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = () => resolve(null);
      im.src = src;
    });
  }

  $effect(() => {
    const canvas = canvasEl;
    if (!canvas) return;

    const isImage = Boolean(src);
    let logoImg: HTMLImageElement | null = null;

    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let texture: WebGLTexture | null = null;
    let texCanvas: HTMLCanvasElement | null = null;
    let raf = 0;
    let observer: ResizeObserver | null = null;
    let disposed = false;
    let startTimeMs = 0;
    let lastCssW = 0;
    let flickOn = false;
    let rgb = [1, 0.42, 0.17];
    let aPosition = 0;
    let uTimeLoc: WebGLUniformLocation | null = null;
    let uStartLoc: WebGLUniformLocation | null = null;
    let uFlickerLoc: WebGLUniformLocation | null = null;
    let uColorLoc: WebGLUniformLocation | null = null;
    let uGlowLoc: WebGLUniformLocation | null = null;
    let uModeLoc: WebGLUniformLocation | null = null;
    let uResLoc: WebGLUniformLocation | null = null;
    let uTexResLoc: WebGLUniformLocation | null = null;

    const onContextLost = (e: Event) => {
      e.preventDefault();
      disposed = true;
      cancelAnimationFrame(raf);
    };
    const onResize = () => redraw();

    function redraw(force = false) {
      if (disposed || !gl || !program || !canvas) return;
      const cssW = Math.max(1, Math.round(canvas.clientWidth));
      if (!force && cssW === lastCssW) return;
      lastCssW = cssW;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (!texCanvas) texCanvas = document.createElement('canvas');
      const tctx = texCanvas.getContext('2d');
      if (!tctx) return;

      let best = 8;
      let lines: string[] = [];
      let ascent = 0;
      let descent = 0;
      let lineH = 1;
      let padV = 0;
      let cssH = 4;
      if (isImage) {
        if (!logoImg || !logoImg.naturalWidth) return;
        cssH = Math.max(2, Math.round(cssW * (logoImg.naturalHeight / logoImg.naturalWidth)));
      } else {
        for (let s = 8; s <= 260; s += 2) {
          const wrapped = wrapLines(tctx, text, cssW, s);
          if (wrapped.length <= maxLines) best = s;
          else break;
        }
        lines = wrapLines(tctx, text, cssW, best);
        if (lines.length === 0) return;
        const m = tctx.measureText(lines[0]);
        ascent = m.actualBoundingBoxAscent || best * 0.78;
        descent = m.actualBoundingBoxDescent || best * 0.22;
        lineH = (ascent + descent) * 1.14;
        padV = Math.max(2, descent * 1.1);
        cssH = Math.max(4, Math.round(padV + (lines.length - 1) * lineH + ascent + descent + padV));
      }

      texCanvas.width = Math.max(2, Math.round(cssW * dpr));
      texCanvas.height = Math.max(2, Math.round(cssH * dpr));
      tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      tctx.clearRect(0, 0, cssW, cssH);
      if (isImage) {
        tctx.drawImage(logoImg as HTMLImageElement, 0, 0, cssW, cssH);
      } else {
        tctx.font = `${best}px "Seven Segment", monospace`;
        tctx.fillStyle = '#ffffff';
        tctx.textAlign = 'left';
        tctx.textBaseline = 'alphabetic';
        lines.forEach((line, i) => {
          tctx.fillText(line, 0, padV + lineH * i + ascent);
        });
      }

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texCanvas);

      canvas.width = texCanvas.width;
      canvas.height = texCanvas.height;
      canvas.style.height = `${cssH}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function draw(now: number) {
      if (disposed || !gl || !program || !canvas) return;
      gl.uniform1f(uTimeLoc, now * 0.001);
      gl.uniform1f(uStartLoc, startTimeMs * 0.001);
      gl.uniform1f(uFlickerLoc, flickOn ? 1 : 0);
      gl.uniform3fv(uColorLoc, rgb);
      gl.uniform1f(uGlowLoc, glow);
      gl.uniform1f(uModeLoc, isImage ? 1 : 0);
      gl.uniform2f(uResLoc, canvas.width, canvas.height);
      gl.uniform2f(uTexResLoc, texCanvas ? texCanvas.width : canvas.width, texCanvas ? texCanvas.height : canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    const boot = async () => {
      try {
        if (isImage) {
          logoImg = await loadImage(src);
          if (disposed || !logoImg) return;
        } else if ('fonts' in document) {
          try {
            await document.fonts.load(`24px "Seven Segment"`, text);
          } catch {
          }
        }

        gl = canvas.getContext('webgl', {
          alpha: true,
          premultipliedAlpha: true,
          antialias: false,
          preserveDrawingBuffer: false,
          powerPreference: 'low-power'
        }) as WebGLRenderingContext | null;
        if (!gl) return;

        const vs = compileShader(gl, VERT_SRC, gl.VERTEX_SHADER);
        const fs = compileShader(gl, FRAG_SRC, gl.FRAGMENT_SHADER);
        program = linkProgram(gl, vs as WebGLShader, fs as WebGLShader);
        if (!program) return;

        uTimeLoc = gl.getUniformLocation(program, 'u_time');
        uStartLoc = gl.getUniformLocation(program, 'u_startTime');
        uFlickerLoc = gl.getUniformLocation(program, 'u_flicker');
        uColorLoc = gl.getUniformLocation(program, 'u_color');
        uGlowLoc = gl.getUniformLocation(program, 'u_glow');
        uModeLoc = gl.getUniformLocation(program, 'u_mode');
        uResLoc = gl.getUniformLocation(program, 'u_res');
        uTexResLoc = gl.getUniformLocation(program, 'u_texRes');
        const uTextureLoc = gl.getUniformLocation(program, 'u_texture');
        aPosition = gl.getAttribLocation(program, 'a_position');

      const vb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vb);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

        texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.uniform1i(uTextureLoc, 0);
        gl.useProgram(program);

        rgb = hexToRgb(tint);
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
        flickOn = flicker && !reduceMotion;

        canvas.addEventListener('webglcontextlost', onContextLost);

        redraw();
        startTimeMs = performance.now() + startDelay;

        if (!isImage && 'fonts' in document) {
          void document.fonts
            .load(`24px "Seven Segment"`, text)
            .catch(() => {})
            .then(() => {
              if (!disposed) redraw(true);
            });
        }

        if (flickOn) {
          const loop = (now: number) => {
            if (disposed) return;
            draw(now);
            raf = requestAnimationFrame(loop);
          };
          raf = requestAnimationFrame(loop);
        } else {
          draw(startTimeMs + 3000);
        }

        observer = new ResizeObserver(() => redraw());
        observer.observe(canvas);
        window.addEventListener('resize', onResize);

        ready = true;
      } catch (err) {
        console.warn('[SegmentDisplay] WebGL init failed, using CSS fallback.', err);
      }
    };
    void boot();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
      ready = false;
    };
  });
</script>

<span class="segment-title-host {className}" class:is-ready={ready} class:is-image={src}>
  <span class="sr-only">{src ? alt : text}</span>
  <canvas aria-hidden="true" class="segment-canvas" bind:this={canvasEl}></canvas>
  {#if !ready}
    {#if src}
      <img class="segment-fallback-img" src={src} alt={alt} aria-hidden="true" />
    {:else}
      <span class="segment-fallback" aria-hidden="true">{text}</span>
    {/if}
  {/if}
</span>

<style>
  .segment-title-host {
    display: block;
  }

  .segment-title-host .segment-canvas {
    display: block;
    width: 100%;
    height: 0;
    visibility: hidden;
  }

  .segment-title-host.is-ready .segment-canvas {
    height: auto;
    visibility: visible;
  }

  .segment-title-host.is-image {
    line-height: 0;
  }

  .segment-fallback-img {
    display: block;
    width: 100%;
    height: auto;
    opacity: 0.92;
    animation: segment-warmup 1.6s steps(14, end) both;
    filter: drop-shadow(0 0 6px rgba(243, 106, 43, 0.65)) drop-shadow(0 0 24px rgba(243, 106, 43, 0.35));
  }

  .segment-fallback {
    display: block;
    font-family: 'Seven Segment', var(--font-title), monospace;
    font-size: inherit;
    line-height: 1.08;
    letter-spacing: 0.02em;
    color: var(--color-orange);
    text-shadow:
      0 0 4px rgba(243, 106, 43, 0.9),
      0 0 12px rgba(243, 106, 43, 0.65),
      0 0 28px rgba(243, 106, 43, 0.4),
      0 0 60px rgba(243, 106, 43, 0.22);
    animation: segment-warmup 1.6s steps(14, end) both;
  }

  @keyframes segment-warmup {
    0% {
      opacity: 0;
    }
    4% {
      opacity: 0.55;
    }
    8% {
      opacity: 0.05;
    }
    14% {
      opacity: 0.9;
    }
    20% {
      opacity: 0.12;
    }
    26% {
      opacity: 1;
    }
    30% {
      opacity: 0.35;
    }
    36% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
</style>
