<script lang="ts">
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import Header from '$lib/components/common/Header.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { auth } from '$lib/stores/auth.svelte';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';

	let navigationItems = $derived(page.data.navigationItems);
	let showNotificationBar = $state(false);
	let showNavigationBar = $state(true);

	function onClickNavigationBar() {
		showNavigationBar = !showNavigationBar;
	}

	function onKeydownNavigationBar(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			onClickNavigationBar();
		}
	}

	function onClickNotificationBar() {
		showNotificationBar = !showNotificationBar;
	}

	function onKeydownNotificationBar(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			onClickNotificationBar();
		}
	}

	// ===== HEADER =====

	/* LOGOUT */
	async function onClickLogout() {
		auth.logout();
		goto(resolve('/login'), { replaceState: true });
	}

	function onKeydownLogout(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			onClickLogout();
		}
	}
</script>

<div class="app-grid">
	<Header
		isLoggedIn={!!auth.user}
		{username}
		{onClickLogout}
		onKeydownLogout={(e) => onKeydownLogout(e)}
	/>
	<Subheader
		{onClickNavigationBar}
		onKeydownNavigationBar={(e) => onKeydownNavigationBar(e)}
		{onClickNotificationBar}
		onKeydownNotificationBar={(e) => onKeydownNotificationBar(e)}
		{showNavigationBar}
		{showNotificationBar}
	/>
	<NavigationBar {showNavigationBar} {navigationItems} />
	<NotificationBar {showNotificationBar} />
	<Dashboard />
	<Footer />
</div>
