<script lang="ts">
		import type { NavigationItem } from '$lib/schemas/navigation.schema';
	import NavigationBarList from './NavigationBarList.svelte';

	interface Props {
		showNavigationBar: boolean;
		navigationItems: NavigationItem[];
	}

	const { showNavigationBar, navigationItems }: Props = $props();
</script>

{#if showNavigationBar}
	<nav
		class="navbar-panel"
		aria-label="Sidebar navigation panel"
		aria-hidden={!showNavigationBar}
		inert={!showNavigationBar}
	>
		<NavigationBarList {navigationItems} />
	</nav>
{/if}