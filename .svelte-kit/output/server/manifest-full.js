export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["assets/logos/logo.png","icon.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".jpg":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.XmA7sbXD.js",app:"_app/immutable/entry/app.B6q7RBrB.js",imports:["_app/immutable/entry/start.XmA7sbXD.js","_app/immutable/chunks/CoBpnh8b.js","_app/immutable/chunks/CnRo4IZZ.js","_app/immutable/chunks/OA8UcISh.js","_app/immutable/chunks/CBIKV7YE.js","_app/immutable/entry/app.B6q7RBrB.js","_app/immutable/chunks/CnRo4IZZ.js","_app/immutable/chunks/DO_C8pz5.js","_app/immutable/chunks/C9Lu5ERF.js","_app/immutable/chunks/CBIKV7YE.js","_app/immutable/chunks/Bh8bEwaV.js","_app/immutable/chunks/CyqSIwg9.js","_app/immutable/chunks/BKWqbsF9.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/calendar",
				pattern: /^\/calendar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/competitions",
				pattern: /^\/competitions\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/gallery",
				pattern: /^\/gallery\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/join",
				pattern: /^\/join\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/resources",
				pattern: /^\/resources\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/resources/[slug]",
				pattern: /^\/resources\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {"_app/immutable/assets/Induction.CyvdTPJ3.jpg":55561,"_app/immutable/assets/Induction2.DHzCcT9Q.jpg":49925,"_app/immutable/assets/Induction3.1djuZOAO.jpg":383284,"_app/immutable/assets/Induction4.BJoGcKCz.jpg":516602,"_app/immutable/assets/Induction5.Bwwbojyg.jpg":405398,"_app/immutable/assets/Induction6.DXX_mUS_.jpg":54440,"_app/immutable/assets/Induction7.Bl9vRJfw.jpg":46653,"_app/immutable/assets/Meeting.5rihj4xO.jpg":257917,"_app/immutable/assets/invitational.yOhjcgGI.jpg":79918}
	}
}
})();
