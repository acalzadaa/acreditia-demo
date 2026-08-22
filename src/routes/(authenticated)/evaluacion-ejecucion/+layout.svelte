<script lang="ts">
	import Header from '$lib/components/features/layout/Header.svelte';
	import Subheader from '$lib/components/features/layout/Subheader.svelte';
	import NotificationBarContainer from '$lib/components/features/notification/NotificationBarContainer.svelte';
	import Footer from '$lib/components/features/layout/Footer.svelte';
	import { createToggle } from '$lib/components/common/stores/toggle.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import type { LayoutProps } from '../$types';
	import { auth } from '$lib/components/common/stores/auth.svelte';
	import { page } from '$app/state';
	import NavigationBarContainer from '$lib/components/features/navigation/NavigationBarContainer.svelte';
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
		onKeydownNavigationBar={(e) => navigationToggle.onKeydown(e)}
		onClickNotificationBar={notificationToggle.onClick}
		onKeydownNotificationBar={(e) => notificationToggle.onKeydown(e)}
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
