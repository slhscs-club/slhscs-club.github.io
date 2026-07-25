
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/about" | "/calendar" | "/competitions" | "/gallery" | "/join" | "/login" | "/resources" | "/resources/[slug]";
		RouteParams(): {
			"/resources/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string | undefined };
			"/about": Record<string, never>;
			"/calendar": Record<string, never>;
			"/competitions": Record<string, never>;
			"/gallery": Record<string, never>;
			"/join": Record<string, never>;
			"/login": Record<string, never>;
			"/resources": { slug?: string | undefined };
			"/resources/[slug]": { slug: string }
		};
		Pathname(): "/" | "/about" | "/calendar" | "/competitions" | "/gallery" | "/join" | "/login" | "/resources" | `/resources/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/assets/logos/logo.png" | "/icon.svg" | string & {};
	}
}