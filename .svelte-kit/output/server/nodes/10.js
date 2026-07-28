import * as universal from '../entries/pages/resources/_slug_/_page.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/resources/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/resources/[slug]/+page.ts";
export const imports = ["_app/immutable/nodes/10.DHJHNzRo.js","_app/immutable/chunks/OA8UcISh.js","_app/immutable/chunks/C9Lu5ERF.js","_app/immutable/chunks/CnRo4IZZ.js","_app/immutable/chunks/_B4zu5cQ.js","_app/immutable/chunks/DO_C8pz5.js","_app/immutable/chunks/Bh8bEwaV.js","_app/immutable/chunks/D-Xnmb3p.js","_app/immutable/chunks/BKWqbsF9.js"];
export const stylesheets = ["_app/immutable/assets/10.CNbX5oyT.css"];
export const fonts = [];
