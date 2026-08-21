<script lang="ts">
	import { toast } from '$lib/utils/toastManager.svelte';
	import Toast from './Toast.svelte';
</script>

<div class="toast-container">
	{#each toast.items as item (item.id)}
		<Toast variant={item.variant} label={item.label} ondismiss={() => toast.dismiss(item.id)} />
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		bottom: var(--space-4);
		right: var(--space-4);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		z-index: 1000;
		pointer-events: none;
	}

	.toast-container :global(.toast) {
		pointer-events: auto;
	}
</style>
