<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import Panel from '$lib/components/ui/panel/Panel.svelte';
	import PanelContent from '$lib/components/ui/panel/PanelContent.svelte';
	import PanelHeader from '$lib/components/ui/panel/PanelHeader.svelte';
	import PanelListItemButton from '$lib/components/ui/panel/PanelListItemButton.svelte';
	import { navigateTo } from '$lib/helpers/navigation';
	import type { IndicadorNavigationStatusItem } from '$lib/schemas/indicador.schema';
	import type { IndicadorNavListItem } from '$lib/schemas/indicadorNavigation.schema';
	import IndicadorNavigationStatusIcon from './IndicadorNavigationStatusIcon.svelte';

	interface Props {
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
		items?: IndicadorNavListItem[];
		navigationStatusItem?: IndicadorNavigationStatusItem[];
	}

	const { showHeader = false, title = 'Add', subtitle = '', items = [], navigationStatusItem }: Props = $props();

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
					<div style="display: flex; gap: 4px;">
						<IndicadorNavigationStatusIcon 
						navigationItem={item}
						navigationStatusItem={navigationStatusItem}
						/>
						<p>
							{item.name}
						</p>
					</div>
				</PanelListItemButton>
			{/each}
		{:else}
			<EmptySection />
		{/if}
	</PanelContent>
</Panel>
