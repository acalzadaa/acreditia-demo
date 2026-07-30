<!--
@component
SublistActions esta pensado para que tenga los IconButtons necesarios
para una pantalla de sublista de elementos con un boton de eliminar.
-->

<script lang="ts">
	import Actions from '../ui/Actions.svelte';

	interface Props {
		item: unknown;
		showRemove?: boolean;
		isRemoveDisabled: boolean;
		onClickRemove: () => void;
	}

	let {
		item,
		showRemove = true,
		isRemoveDisabled = false,
		onClickRemove
	}: Props = $props();
</script>

<Actions {item} {showRemove} {isRemoveDisabled} {onClickRemove} />
