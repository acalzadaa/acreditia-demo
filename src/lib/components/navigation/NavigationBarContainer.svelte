<script lang="ts">
	import type { NavigationItem } from '$lib/types/navigation.types';
	import Drawer from '../ui/Drawer.svelte';
	import NavigationBar from './NavigationBar.svelte';
	import NavigationBarList from './NavigationBarList.svelte';

	interface Props {
		showNavigationBar: boolean;
		navigationItems: NavigationItem[];
	}

	const { showNavigationBar, navigationItems }: Props = $props();
</script>

<!--
	Ambas facetas se renderizan siempre; el media query decide cuál es visible.
	`display: contents` hace que el wrapper "desaparezca" para
	efectos del grid, de modo que .navbar-panel (dentro de NavigationBar)
	siga siendo un hijo directo de .app-grid y respete grid-area: navbar.
-->
<div class="navbar-slot navbar-slot--grid">
	<NavigationBar {showNavigationBar} {navigationItems} />
</div>

<div class="navbar-slot navbar-slot--drawer">
	<Drawer show={showNavigationBar} position="top-left" ariaLabel="Menú de navegación">
			<NavigationBarList {navigationItems} />
	</Drawer>
</div>

<style>
	.navbar-slot--grid {
		display: contents;
	}
	.navbar-slot--drawer {
		display: none;
	}

	@media (max-width: 640px) {
		.navbar-slot--grid {
			display: none;
		}
		.navbar-slot--drawer {
			display: contents;
		}
	}
</style>
