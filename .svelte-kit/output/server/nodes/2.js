import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.BWxXO5y3.js","_app/immutable/chunks/BzKzucxl.js","_app/immutable/chunks/C8aOZbes.js","_app/immutable/chunks/Dmn3HYvu.js","_app/immutable/chunks/C0DvJDb9.js","_app/immutable/chunks/ClQY84ez.js","_app/immutable/chunks/D9sdohR7.js","_app/immutable/chunks/DP35plEG.js","_app/immutable/chunks/DNUb-uAt.js","_app/immutable/chunks/BkyI4z3c.js","_app/immutable/chunks/CgW-hpV7.js"];
export const stylesheets = ["_app/immutable/assets/2.4G6Ppsmy.css"];
export const fonts = [];
