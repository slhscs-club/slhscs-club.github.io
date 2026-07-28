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
		client: {start:"_app/immutable/entry/start.XmA7sbXD.js",app:"_app/immutable/entry/app.B6q7RBrB.js",imports:["_app/immutable/entry/start.XmA7sbXD.js","_app/immutable/chunks/CoBpnh8b.js","_app/immutable/chunks/CnRo4IZZ.js","_app/immutable/chunks/OA8UcISh.js","_app/immutable/chunks/CBIKV7YE.js","_app/immutable/entry/app.B6q7RBrB.js","_app/immutable/chunks/CnRo4IZZ.js","_app/immutable/chunks/DO_C8pz5.js","_app/immutable/chunks/C9Lu5ERF.js","_app/immutable/chunks/CBIKV7YE.js","_app/immutable/chunks/Bh8bEwaV.js","_app/immutable/chunks/CyqSIwg9.js","_app/immutable/chunks/BKWqbsF9.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
