import * as server from '../entries/pages/gallery/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/gallery/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/gallery/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.DSNahY4s.js","_app/immutable/chunks/BzKzucxl.js","_app/immutable/chunks/C8aOZbes.js","_app/immutable/chunks/C0DvJDb9.js","_app/immutable/chunks/ClQY84ez.js","_app/immutable/chunks/D9sdohR7.js","_app/immutable/chunks/Dmn3HYvu.js","_app/immutable/chunks/DP35plEG.js","_app/immutable/chunks/CgW-hpV7.js"];
export const stylesheets = ["_app/immutable/assets/6.OHfDiEVl.css"];
export const fonts = [];
