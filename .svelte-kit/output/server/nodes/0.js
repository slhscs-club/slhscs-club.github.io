import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.BEBjC6Yp.js","_app/immutable/chunks/C9Lu5ERF.js","_app/immutable/chunks/CnRo4IZZ.js","_app/immutable/chunks/_B4zu5cQ.js"];
export const stylesheets = ["_app/immutable/assets/0.Or-ENw-G.css"];
export const fonts = [];
