<script lang="ts">
	import IconButton from './IconButton.svelte';

	interface Props {
		item?: unknown;

		showExecute?: boolean;
		showDetail?: boolean;
		showEdit?: boolean;
		showDelete?: boolean;
		showRestore?: boolean;
		showRemove?: boolean;
		showCalendar?: boolean;

		isExecuteDisabled?: boolean;
		isDetailDisabled?: boolean;
		isEditDisabled?: boolean;
		isDeleteDisabled?: boolean;
		isRestoreDisabled?: boolean;
		isRemoveDisabled?: boolean;
		isCalendarDisabled?: boolean;

		onClickExecute?: (item: unknown) => void;
		onClickDetail?: (item: unknown) => void;
		onClickEdit?: (item: unknown) => void;
		onClickDelete?: (item: unknown) => void;
		onClickRestore?: (item: unknown) => void;
		onClickRemove?: (item: unknown) => void;
		onClickCalendar?: (item: unknown) => void;
	}

	let {
		item,

		showExecute = false,
		showDetail = false,
		showEdit = false,
		showDelete = false,
		showRestore = false,
		showRemove = false,
		showCalendar = false,

		isExecuteDisabled = false,
		isDetailDisabled = false,
		isEditDisabled = false,
		isDeleteDisabled = false,
		isRestoreDisabled = false,
		isRemoveDisabled = false,
		isCalendarDisabled = false,

		onClickExecute,
		onClickDetail,
		onClickEdit,
		onClickDelete,
		onClickRestore,
		onClickRemove,
		onClickCalendar
	}: Props = $props();
</script>

<main>
	<div class="col-actions-row">
		{#if showExecute && onClickExecute && item}
			<IconButton
				isDisabled={isExecuteDisabled}
				name="play"
				tooltipLabel="Ejecutar proceso"
				size="md"
				borderShape="square"
				variant="ghost"
				onClick={() => onClickExecute(item)}
			/>
		{/if}

		{#if showDetail && onClickDetail && item}
			<IconButton
				isDisabled={isDetailDisabled}
				name="detail"
				tooltipLabel="Ver detalle"
				size="md"
				borderShape="square"
				variant="ghost"
				onClick={() => onClickDetail(item)}
			/>
		{/if}
		{#if showEdit && onClickEdit && item}
			<IconButton
				isDisabled={isEditDisabled}
				name="edit"
				tooltipLabel="Editar registro"
				size="md"
				borderShape="square"
				variant="ghost"
				onClick={() => onClickEdit(item)}
			/>
		{/if}

		{#if showDelete && onClickDelete && item}
			<IconButton
				isDisabled={isDeleteDisabled}
				name="delete"
				tooltipLabel="Borrar registro"
				size="md"
				borderShape="square"
				variant="ghost"
				onClick={() => onClickDelete(item)}
			/>
		{/if}

		{#if showRestore && onClickRestore && item}
			<IconButton
				isDisabled={isRestoreDisabled}
				name="restore"
				tooltipLabel="Restaurar registro"
				size="md"
				borderShape="square"
				variant="ghost"
				onClick={() => onClickRestore(item)}
			/>
		{/if}

		{#if showRemove && onClickRemove && item}
			<IconButton
				isDisabled={isRemoveDisabled}
				name="remove"
				tooltipLabel="Remover registro"
				size="md"
				borderShape="square"
				variant="ghost"
				onClick={() => onClickRemove(item)}
			/>
		{/if}

		{#if showCalendar && onClickCalendar && item}
			<IconButton
				isDisabled={isCalendarDisabled}
				name="calendar"
				tooltipLabel="Seleccionar fecha"
				size="md"
				borderShape="square"
				variant="ghost"
				onClick={() => onClickCalendar(item)}
			/>
		{/if}
	</div>
</main>
