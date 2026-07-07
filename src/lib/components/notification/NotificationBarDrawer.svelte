<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { NotificationItem } from '$lib/schemas/notificacion.schema';
	import Actions from '../ui/Actions.svelte';
	import Card from '../ui/card/Card.svelte';
	import CardColumn from '../ui/card/CardColumn.svelte';
	import CardContent from '../ui/card/CardContent.svelte';
	import CardContentItem from '../ui/card/CardContentItem.svelte';
	import CardFooter from '../ui/card/CardFooter.svelte';
	import CardHeader from '../ui/card/CardHeader.svelte';

	interface Props {
		items: NotificationItem[];
	}

	const { items }: Props = $props();

	function onClickDetail(item: NotificationItem) {
		if (item.link && item.link.length > 0) {
			goto(resolve(`${item.link}?from=notification&id=${item.id}`));
		}
	}
</script>

<CardColumn>
	{#each items as item (item)}
		<Card>
			<CardHeader name={item.header} />
			{#if item.message}
				<CardContent>
					<CardContentItem value={item.message} />
				</CardContent>
			{/if}
			{#if item.link}
				<CardFooter>
					<Actions
						{item}
						showDetail={true}
						isDetailDisabled={false}
						onClickDetail={() => {
							onClickDetail(item);
						}}
					/>
				</CardFooter>
			{/if}
		</Card>
	{/each}
</CardColumn>
