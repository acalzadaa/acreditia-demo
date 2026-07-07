<script lang="ts">
	import type { NotificationItem } from '$lib/schemas/notificacion.schema';
	import Drawer from '../ui/Drawer.svelte';
	import NotificationBarDrawer from './NotificationBarDrawer.svelte';

	interface Props {
		showNotificationBar: boolean;
		items?: NotificationItem[];
	}

	const {
		showNotificationBar,
		items = [
			{
				id: '4f0462be-5be3-4ed4-a226-62e962c26c3c',
				header: 'prueba',
				from: { type: 'system' },
				to: { type: 'global' },
				message: 'test',
				createdAt: '2024-01-15T10:00:00Z',
				createdBy: 'planeacion@universidad.edu',
				link: ''
			}
		]
	}: Props = $props();
</script>

<Drawer
	show={showNotificationBar}
	position="top-right"
	width="400px"
	top="calc(var(--header-height) + var(--subheader-height))"
	ariaLabel="Panel de Notificaciones"
>
	{#snippet header()}
		<h3 class="text-body">Notificaciones</h3>
	{/snippet}
	<NotificationBarDrawer {items} />
</Drawer>
