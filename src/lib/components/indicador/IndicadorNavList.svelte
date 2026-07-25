<script lang="ts">
	import { navigateTo } from '$lib/helpers/navigation';
	import type { indicadorNavListItem } from '$lib/schemas/indicadorNavigation.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import Panel from '../ui/panel/Panel.svelte';
	import PanelContent from '../ui/panel/PanelContent.svelte';
	import PanelHeader from '../ui/panel/PanelHeader.svelte';
	import PanelListItemButton from '../ui/panel/PanelListItemButton.svelte';

	interface Props {
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
		items: indicadorNavListItem[];
	}

	const { showHeader = false, title = 'Add', subtitle = '', items }: Props = $props();

	const sortedItems = $derived([...items].sort((a, b) => a.order - b.order));
</script>

<Panel>
	{#if showHeader}
		<PanelHeader {title} {subtitle} />
	{/if}
	<PanelContent>
		{#if sortedItems.length > 0}
			{#each sortedItems as item (item.id)}
				<PanelListItemButton onClick={() => navigateTo(item.url)}>
					{item.name}
				</PanelListItemButton>
			{/each}
		{:else}
			<EmptySection />
		{/if}
	</PanelContent>
</Panel>