<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NotificationBarContainer from '$lib/components/notification/NotificationBarContainer.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import type { LayoutProps } from '../$types';
	import { auth } from '$lib/stores/auth.svelte';
	import { page } from '$app/state';
	import NavigationBarContainer from '$lib/components/navigation/NavigationBarContainer.svelte';
	let { children }: LayoutProps = $props();

	let username = auth.user?.email?.split('@')[0] || 'Usuario';
	let navigationItems = $derived(page.data.navigationItems);

	/* LOGOUT */
	async function onClickLogout() {
		await auth.logout();
		goto(resolve('/login'), { replaceState: true });
	}

	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR =====
	let navigationToggle = createToggle(true);
	let notificationToggle = createToggle(false);
</script>

<div class="app-grid">
	<Header {username} {onClickLogout} />
	<Subheader
		onClickNavigationBar={navigationToggle.onClick}
		onClickNotificationBar={notificationToggle.onClick}
		showNavigationBar={navigationToggle.value}
		showNotificationBar={notificationToggle.value}
	/>
	<NavigationBarContainer showNavigationBar={navigationToggle.value} {navigationItems} />
	<NotificationBarContainer showNotificationBar={notificationToggle.value} />

	<main class="main-children">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.main-children {
		grid-area: main;
		background-color: var(--bg-ground);
		min-height: 0;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
</style>
