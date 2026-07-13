<script lang="ts">
	import ListActions from '$lib/components/actions/ListActions.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardColumn from '$lib/components/ui/card/CardColumn.svelte';
	import CardContent from '$lib/components/ui/card/CardContent.svelte';
	import CardContentItem from '$lib/components/ui/card/CardContentItem.svelte';
	import CardFooter from '$lib/components/ui/card/CardFooter.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import type { InstitucionItem } from '$lib/schemas/institucion.schema';

	interface Props {
		items: InstitucionItem[];
		onClickEditar: (item: InstitucionItem) => void;
		onClickBorrar: (item: InstitucionItem) => void;
		onClickRestaurar: (item: InstitucionItem) => void;
	}

	const { items, onClickEditar, onClickBorrar, onClickRestaurar }: Props = $props();
</script>

<CardColumn minWidth="360px" maxWidth="1500px">
	{#each items as item (item.id)}
		<Card>
			<CardHeader code={item.code} name={item.name}>
				<Badge variant={item.isDeleted ? 'error' : 'success'}>
					{item.isDeleted ? 'borrado' : 'activo'}
				</Badge>
			</CardHeader>

			<CardContent>
				<CardContentItem label="Entidad legal" value={item?.entidadLegal?.name} />
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
