// Desactiva SSR en toda la app → SPA puro
export const ssr = false;
export const prerender = false;

import navigation from '$lib/data/navigation.json';

export const load = () => {
	return { navigationItems: navigation.navigationItems };
};
