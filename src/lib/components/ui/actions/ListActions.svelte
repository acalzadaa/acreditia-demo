<!--
@component
ListActions esta pensado para que tenga los IconButtons necesarios
para una pantalla de lista de elementos, normalmente Edit,Delete,Restore
-->

<script lang="ts">
	import Actions from "./Actions.svelte";


	interface Props {
		item: unknown;

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
