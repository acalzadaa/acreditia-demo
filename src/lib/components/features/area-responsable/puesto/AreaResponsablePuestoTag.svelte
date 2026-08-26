<script lang="ts">
	import Tag from '$lib/components/ui/Tag.svelte';
	import type { AreaResponsableTotalPuestosItem } from '$lib/schemas/areaResponsable.schema';
	import { formatPuestoSubtitleMessage } from '../utils/areaResponsableUtils';

	interface Props {
		item: AreaResponsableTotalPuestosItem;
	}

	let { item }: Props = $props();
</script>

<Tag variant={formatPuestoSubtitleMessage(item).variant}>
	{formatPuestoSubtitleMessage(item).label}
</Tag>
