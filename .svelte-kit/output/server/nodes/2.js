import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.R4nd8hYn.js","_app/immutable/chunks/C9Lu5ERF.js","_app/immutable/chunks/CnRo4IZZ.js","_app/immutable/chunks/_B4zu5cQ.js","_app/immutable/chunks/DO_C8pz5.js","_app/immutable/chunks/Bh8bEwaV.js","_app/immutable/chunks/D-Xnmb3p.js","_app/immutable/chunks/BKWqbsF9.js","_app/immutable/chunks/ByIhKZI_.js","_app/immutable/chunks/CyqSIwg9.js","_app/immutable/chunks/CgW-hpV7.js"];
export const stylesheets = ["_app/immutable/assets/2.CX0ugg-V.css"];
export const fonts = [];
