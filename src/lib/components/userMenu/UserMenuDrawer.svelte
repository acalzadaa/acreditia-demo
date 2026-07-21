<script lang="ts">
	import Button from '../ui/Button.svelte';

	interface Props {
		onClickLogout: (e: MouseEvent) => void;
	}

	let { onClickLogout }: Props = $props();
</script>

<main class="userMenu--panel">
	<Button fullWidth={true} name="close" variant="critical" onClick={onClickLogout}>
		Cerrar sesion
	</Button>
</main>

<style>
	.userMenu--panel {
		padding-top: 10px;
		display: flex;
		flex: 1;
		justify-content: center;
	}
</style>
