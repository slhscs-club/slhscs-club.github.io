export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["assets/logos/logo.png","icon.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.DtF6HBZD.js",app:"_app/immutable/entry/app.UVQXyu1n.js",imports:["_app/immutable/entry/start.DtF6HBZD.js","_app/immutable/chunks/Bb7GVJ0U.js","_app/immutable/chunks/C8aOZbes.js","_app/immutable/chunks/OA8UcISh.js","_app/immutable/chunks/C5zoAQrH.js","_app/immutable/entry/app.UVQXyu1n.js","_app/immutable/chunks/C8aOZbes.js","_app/immutable/chunks/C0DvJDb9.js","_app/immutable/chunks/BzKzucxl.js","_app/immutable/chunks/C5zoAQrH.js","_app/immutable/chunks/ClQY84ez.js","_app/immutable/chunks/BkyI4z3c.js","_app/immutable/chunks/DP35plEG.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/__data.json","/about","/calendar","/calendar/__data.json","/competitions","/gallery","/gallery/__data.json","/join","/login","/resources"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
