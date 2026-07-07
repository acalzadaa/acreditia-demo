<script lang="ts">
	import type { NotificationItem } from '$lib/schemas/notificacion.schema';
	import Card from '../ui/card/Card.svelte';
	import CardColumn from '../ui/card/CardColumn.svelte';
	import CardContent from '../ui/card/CardContent.svelte';
	import CardContentItem from '../ui/card/CardContentItem.svelte';

	interface Props {
		items: NotificationItem[];
	}

	const { items }: Props = $props();
</script>

<CardColumn>
	{#each items as item (item)}
		<Card>
			<CardContent>
				<CardContentItem label="Descripción" value={item.header} />
			</CardContent>
		</Card>
	{/each}
</CardColumn>
