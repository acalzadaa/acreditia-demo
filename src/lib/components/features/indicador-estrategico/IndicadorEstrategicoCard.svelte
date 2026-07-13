<script lang="ts">
	import ListActions from '$lib/components/actions/ListActions.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardColumn from '$lib/components/ui/card/CardColumn.svelte';
	import CardContent from '$lib/components/ui/card/CardContent.svelte';
	import CardContentItem from '$lib/components/ui/card/CardContentItem.svelte';
	import CardFooter from '$lib/components/ui/card/CardFooter.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import type { IndicadorEstrategicoItem } from '$lib/schemas/indicadorEstrategico.schema';

	interface Props {
		items: IndicadorEstrategicoItem[];
		onClickEditar: (item: IndicadorEstrategicoItem) => void;
		onClickBorrar: (item: IndicadorEstrategicoItem) => void;
		onClickRestaurar: (item: IndicadorEstrategicoItem) => void;
	}

	const { items, onClickEditar, onClickBorrar, onClickRestaurar }: Props = $props();
</script>

<CardColumn minWidth="360px" maxWidth="2699px">
	{#each items as item (item.id)}
		<Card>
			<CardHeader code={item.code} name={item.name}>
				<Badge variant={item.isDeleted ? 'error' : 'success'}>
					{item.isDeleted ? 'borrado' : 'activo'}
				</Badge>
			</CardHeader>

			<CardContent>
				<CardContentItem label="Objetivo" value={item.objetivo.code} />
				<CardContentItem label="Descripción" value={item.description} />
				<CardContentItem label="Meta" value={item.target + ' ' + item.targetUnit} />
				<CardContentItem label="Origen de Datos" value={item.dataOrigin} />
				<CardContentItem label="Formula de Datos" value={item.dataFormula} />
				<CardContentItem
					label="Frecuencia"
					value={item.frequencyValue + ' ' + item.frequencyUnit}
				/>
			</CardContent>

			<CardFooter>
				<ListActions
					{item}
					onClickEdit={() => onClickEditar(item)}
					isEditDisabled={item.isDeleted}
					onClickDelete={() => onClickBorrar(item)}
					isDeleteDisabled={item.isDeleted}
					onClickRestore={() => onClickRestaurar(item)}
					isRestoreDisabled={!item.isDeleted}
				/>
			</CardFooter>
		</Card>
	{/each}
</CardColumn>
