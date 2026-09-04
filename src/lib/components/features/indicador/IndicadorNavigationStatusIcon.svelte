<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import type { IndicadorNavigationStatusItem } from '$lib/schemas/indicador.schema';
	import type { IndicadorNavListItem } from '$lib/schemas/indicadorNavigation.schema';

	interface Props {
		navigationStatusItems?: IndicadorNavigationStatusItem[];
		navigationItem?: IndicadorNavListItem;
	}

	let { navigationStatusItems, navigationItem }: Props = $props();
</script>

{#if navigationStatusItems?.find((item) => item.code === navigationItem?.code)?.status === 'complete'}
	<Icon weight={1} isFilled={true} color="var(--success-500);" name="check" />
{:else}
	<Icon weight={1} isFilled={true} color="var(--warning-300);" name="warning" />
{/if}
