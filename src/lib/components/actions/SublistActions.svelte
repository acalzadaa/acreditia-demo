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
