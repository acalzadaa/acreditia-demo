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
	import ToastContainer from '$lib/components/common/ToastContainer.svelte';
	import { getNotificacion } from '$lib/stores/data.svelte';
	import NavigationBarContainer from '$lib/components/navigation/NavigationBarContainer.svelte';
	let { children }: LayoutProps = $props();

	let username = auth.user?.email?.split('@')[0] || 'Usuario';
	let navigationItems = $derived(page.data.navigationItems);
	let notificationItems = getNotificacion();

	/* LOGOUT */
	async function onClickLogout() {
		await auth.logout();
		goto(resolve('/login'), { replaceState: true });
	}

	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR =====
	let navigationToggle = createToggle(true);
	let notificationToggle = createToggle(false);
	let userMenuToggle = createToggle(false);
</script>

<div class="app-grid">
	<Header
		{username}
		{onClickLogout}
		onClickAvatar={() => userMenuToggle.toggle()}
		showUserMenu={userMenuToggle.value}
	/>
	<Subheader
		onClickNavigationBar={navigationToggle.onClick}
		onKeydownNavigationBar={(e) => navigationToggle.onKeydown(e)}
		onClickNotificationBar={notificationToggle.onClick}
		onKeydownNotificationBar={(e) => notificationToggle.onKeydown(e)}
		showNavigationBar={navigationToggle.value}
		showNotificationBar={notificationToggle.value}
	/>
	<NavigationBarContainer showNavigationBar={navigationToggle.value} {navigationItems} />
	<NotificationBarContainer
		items={notificationItems}
		showNotificationBar={notificationToggle.value}
	/>

	<main class="main-children">
		{@render children()}
	</main>
	<Footer />
</div>

<ToastContainer />
