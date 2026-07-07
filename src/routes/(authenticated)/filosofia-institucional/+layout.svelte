<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBarContainer from '$lib/components/notification/NotificationBarContainer.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import type { LayoutProps } from '../$types';
	import { auth } from '$lib/stores/auth.svelte';
	import { page } from '$app/state';
	import ToastContainer from '$lib/components/common/ToastContainer.svelte';
	import { getNotificacion } from '$lib/stores/data.svelte';
	let { children }: LayoutProps = $props();

	let username = auth.user?.email?.split('@')[0] || 'Usuario';
	let navigationItems = $derived(page.data.navigationItems);
	let notificationItems = getNotificacion();

	/* LOGOUT */
	async function onClickLogout() {
		await auth.logout();
		goto(resolve('/login'), { replaceState: true });
	}

	function onKeydownLogout(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			onClickLogout();
		}
	}

	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR =====
	let navigationToggle = createToggle(true);
	let notificationToggle = createToggle(false);
</script>

<div class="app-grid">
	<Header
		isLoggedIn={!!auth.user}
		{username}
		{onClickLogout}
		onKeydownLogout={(e) => onKeydownLogout(e)}
	/>
	<Subheader
		onClickNavigationBar={navigationToggle.onClick}
		onKeydownNavigationBar={(e) => navigationToggle.onKeydown(e)}
		onClickNotificationBar={notificationToggle.onClick}
		onKeydownNotificationBar={(e) => notificationToggle.onKeydown(e)}
		showNavigationBar={navigationToggle.value}
		showNotificationBar={notificationToggle.value}
	/>
	<NavigationBar showNavigationBar={navigationToggle.value} {navigationItems} />
	<NotificationBarContainer items={notificationItems} showNotificationBar={notificationToggle.value} />

	<main class="main-children">
		{@render children()}
	</main>
	<Footer />
</div>

<ToastContainer />

<style>
	.main-children {
		grid-area: main;
		background-color: var(--bg-ground);
		min-height: 0;
		overflow: hidden;
	}

	.app-grid {
		display: grid;
		grid-template-areas:
			'header header'
			'subheader subheader'
			'navbar main'
			'footer footer';
		grid-template-columns: auto 1fr;
		grid-template-rows: auto auto 1fr auto;
		height: 100vh;
		position: relative;
	}
</style>
