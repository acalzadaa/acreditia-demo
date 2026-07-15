<script lang="ts">
	import Actions from "../ui/Actions.svelte";


	interface Props {
		item: unknown;

		showEdit?: boolean;
		isEditDisabled: boolean;
		onClickEdit: () => void;

		showRemove?: boolean;
		isRemoveDisabled: boolean;
		onClickRemove: () => void;
	}

	let {
		item,

		showEdit = true,
		isEditDisabled = false,
		onClickEdit,

		showRemove = true,
		isRemoveDisabled = false,
		onClickRemove
	}: Props = $props();
</script>

<Actions
	{item}
	{showEdit}
	{isEditDisabled}
	{onClickEdit}
	{showRemove}
	{isRemoveDisabled}
	{onClickRemove}
/>
