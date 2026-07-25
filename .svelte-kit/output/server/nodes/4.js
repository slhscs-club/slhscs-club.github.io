import * as server from '../entries/pages/calendar/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/calendar/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/calendar/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.B3iFsqKp.js","_app/immutable/chunks/BzKzucxl.js","_app/immutable/chunks/C8aOZbes.js","_app/immutable/chunks/Dmn3HYvu.js","_app/immutable/chunks/C0DvJDb9.js","_app/immutable/chunks/ClQY84ez.js","_app/immutable/chunks/D9sdohR7.js","_app/immutable/chunks/DP35plEG.js","_app/immutable/chunks/DNUb-uAt.js"];
export const stylesheets = ["_app/immutable/assets/4.B48nLpNY.css"];
export const fonts = [];
