<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import type { IndicadorNavigationStatusItem } from '$lib/schemas/indicador.schema';
	import type { IndicadorNavListItem } from '$lib/schemas/indicadorNavigation.schema';

	interface Props {
		navigationStatusItem?: IndicadorNavigationStatusItem[];
		navigationItem?: IndicadorNavListItem;
	}

	let { navigationStatusItem, navigationItem }: Props = $props();
</script>

{#if navigationStatusItem?.find((item) => item.code === navigationItem?.code)?.status === 'complete'}
	<Icon weight={1} isFilled={true} color="var(--success-500);" name="check" />
{:else}
	<Icon weight={1} isFilled={true} color="var(--warning-300);" name="warning" />
{/if}
