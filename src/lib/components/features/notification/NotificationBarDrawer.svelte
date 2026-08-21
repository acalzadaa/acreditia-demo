<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Actions from '$lib/components/ui/actions/Actions.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardColumn from '$lib/components/ui/card/CardColumn.svelte';
	import CardContent from '$lib/components/ui/card/CardContent.svelte';
	import CardContentItem from '$lib/components/ui/card/CardContentItem.svelte';
	import CardFooter from '$lib/components/ui/card/CardFooter.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import type { NotificationItem } from '$lib/schemas/notificacion.schema';
	

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
			<CardHeader title={item.header} />
			{#if item.message}
				<CardContent>
					<CardContentItem label={item.from.type} value={item.message} />
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
