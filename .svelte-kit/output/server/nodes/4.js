import * as server from '../entries/pages/calendar/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/calendar/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/calendar/+page.server.ts";
export const imports = ["_app/immutable/nodes/4._Nl4_ybF.js","_app/immutable/chunks/C9Lu5ERF.js","_app/immutable/chunks/CnRo4IZZ.js","_app/immutable/chunks/_B4zu5cQ.js","_app/immutable/chunks/DO_C8pz5.js","_app/immutable/chunks/Bh8bEwaV.js","_app/immutable/chunks/D-Xnmb3p.js","_app/immutable/chunks/BKWqbsF9.js","_app/immutable/chunks/ByIhKZI_.js"];
export const stylesheets = ["_app/immutable/assets/4.B48nLpNY.css"];
export const fonts = [];
