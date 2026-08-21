<script lang="ts">
	import Drawer from '$lib/components/ui/Drawer.svelte';
	import UserMenuDrawer from './UserMenuDrawer.svelte';

	interface Props {
		showUserMenu: boolean;
		onClickLogout: () => void;
	}

	const { showUserMenu, onClickLogout }: Props = $props();
</script>

<Drawer
	show={showUserMenu}
	position="top-right"
	width="400px"
	top="var(--header-height)"
	ariaLabel="Panel de Usuario"
>
	{#snippet header()}
		<h3 class="text-body">Panel de Usuario</h3>
	{/snippet}
	<UserMenuDrawer {onClickLogout}  />
</Drawer>
