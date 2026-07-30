<!--
@component
ListDetailActions esta pensado para que tenga los IconButtons necesarios
para una pantalla de lista de elementos con un boton de detalle
este boton de detalle normalmente tiene un onClick(navigateTo('url'))
Usa Actions y agrega el boton de Detail a ListActions.
-->
<script lang="ts">
	import Actions from '../ui/Actions.svelte';

	interface Props {
		item: unknown;

		showDetail?: boolean;
		isDetailDisabled: boolean;
		onClickDetail: () => void;

		showEdit?: boolean;
		isEditDisabled: boolean;
		onClickEdit: () => void;

		showDelete?: boolean;
		isDeleteDisabled: boolean;
		onClickDelete: () => void;

		showRestore?: boolean;
		isRestoreDisabled: boolean;
		onClickRestore: () => void;
	}

	let {
		item,

		showDetail = true,
		isDetailDisabled = false,
		onClickDetail,

		showEdit = true,
		isEditDisabled = false,
		onClickEdit,

		showDelete = true,
		isDeleteDisabled = false,
		onClickDelete,

		showRestore = true,
		isRestoreDisabled = false,
		onClickRestore
	}: Props = $props();
</script>

<Actions
	{item}
	{showDetail}
	{isDetailDisabled}
	{onClickDetail}
	{showEdit}
	{isEditDisabled}
	{onClickEdit}
	{showDelete}
	{isDeleteDisabled}
	{onClickDelete}
	{showRestore}
	{isRestoreDisabled}
	{onClickRestore}
/>
