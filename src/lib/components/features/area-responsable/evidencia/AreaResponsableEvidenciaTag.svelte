<script lang="ts">
	import Tag from '$lib/components/ui/Tag.svelte';
	import { type AreaResponsableEvidenciaItem } from '$lib/schemas/areaResponsableEvidencia.schema';
	import { formatEvidenciaSubtitleMessage } from '../utils/areaResponsableUtils';

	interface Props {
		items: AreaResponsableEvidenciaItem[];
	}

	let { items }: Props = $props();
</script>

<Tag variant={formatEvidenciaSubtitleMessage(items).variant}>
	{formatEvidenciaSubtitleMessage(items).label}
</Tag>
