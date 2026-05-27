<script lang="ts">
	import Icon from '../ui/Icon.svelte';

	interface Props {
		message: string;
	}

	let { message }: Props = $props();
</script>

<div class="empty-state">
	<Icon name="warning" size="xl" class="empty-icon" color="var(--bg-warning-bold" />
	<p class="text-h6 empty-message">{message}</p>
	<p class="text-body empty-submessage">
		Presiona el botón <Icon name="add" size="sm" /> para crear el primer elemento
	</p>
</div>

<style>
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		min-height: 400px;
		text-align: center;
		gap: 1rem;
		padding: 2rem;
	}

	.empty-message {
		color: var(--text-color-secondary);
		margin: 0;
	}

	.empty-submessage {
		color: var(--text-color-secondary);
		margin: 0;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		justify-content: center;
	}
</style>
