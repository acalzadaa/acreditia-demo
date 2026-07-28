<script lang="ts">
	import { page } from '$app/state';
	import RubricaCriterioList from '$lib/components/indicador/rubrica/RubricaCriterioList.svelte';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import { getRubrica } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';

	let indicadorCode = page.params.indicadorCode;
	let rubricaItems = getRubrica().filter((item) => item.indicador.code === indicadorCode);

	let modal = createModalManager<RubricaItem>();
	let toggle = createToggle();
</script>

<main class="detail-panel">
	<RubricaCriterioList
		items={rubricaItems}
		isVisible={toggle.value}
		onClickToggle={toggle.onClick}
		onClickRemover={() => modal.handlers('remove').onClickItem}
		onClickAdd={() => modal.handlers('add').onClickItem}
	/>
</main>
