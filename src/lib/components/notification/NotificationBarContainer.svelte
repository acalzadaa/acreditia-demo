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
				header: 'Evaluacion primavera 20253',
				from: { type: 'system' },
				to: { type: 'global' },
				message: 'Ya inicio la evaluacion primavera 2025/3, por lo que te sugerimos que acceses a la evaluacion para que realices las actividades',
				createdAt: '2024-01-15T10:00:00Z',
				createdBy: 'planeacion@universidad.edu',
				link: '/evaluacion/2025-3'
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
		<h3 class="text-body">Panel de notificaciones</h3>
	{/snippet}
	<NotificationBarDrawer {items} />
</Drawer>
