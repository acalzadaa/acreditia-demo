import { goto } from '$app/navigation';
import { page } from '$app/state';
import type { NavigationItem } from '$lib/schemas/navigation.schema';

export function findParentIdByUrl(url: string, navigationItems: NavigationItem[]): number | null {
	for (const item of navigationItems) {
		if (item.href === url) {
			return item.id;
		}

		if (item.children && item.children.length > 0) {
			for (const child of item.children) {
				if (child.href === url) {
					return item.id;
				}
			}

			const nestedParentId = findParentIdByUrl(url, item.children);
			if (nestedParentId !== null) {
				return nestedParentId;
			}
		}
	}

	return null;
}

function buildChildUrl(childPath: string): string {
	const base = page.url.pathname.replace(/\/+$/, '');
	const child = childPath.replace(/^\/+/, '');
	const result = `${base}/${child}`.replace(/\/{2,}/g, '/');
	return result;
}

export function navigateTo(childPath: string) {
	// La ruta es dinamica e interna, por lo que quite el warning
	// relacionado con agregar resolve() al goto
	// eslint-disable-next-line svelte/no-navigation-without-resolve
	goto(buildChildUrl(childPath));
}

export function navigateToBreadcrumb(segment: string) {
	const currentPath = page.url.pathname;
	const pathSegments = currentPath.split('/').filter((segment) => segment.length > 0);

	// Encontrar el índice del segmento en la ruta actual
	const normalizedSegment = segment.replace(/^\/|\/$/g, '');
	const segmentIndex = pathSegments.indexOf(normalizedSegment);

	if (segmentIndex === -1) {
		console.warn(`Segmento "${segment}" no encontrado en la ruta actual`);
		return;
	}

	// Construir la ruta hasta el segmento encontrado
	const targetSegments = pathSegments.slice(0, segmentIndex + 1);
	const targetPath = '/' + targetSegments.join('/');

	// eslint-disable-next-line svelte/no-navigation-without-resolve
	goto(targetPath);
}
