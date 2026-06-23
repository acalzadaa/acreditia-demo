<script lang="ts">
	import { page } from '$app/state';
	import EtapaMetaForm from '$lib/components/evaluacion/etapa/metadata/AddEtapaMetaForm.svelte';

	let etapaCode = page.params.etapaCode;
</script>

{#if etapaCode === 'meta'}
	<EtapaMetaForm />
{:else if etapaCode === 'nometa'}
	<h1>test</h1>
{/if}
