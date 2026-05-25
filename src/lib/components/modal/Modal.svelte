<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		closeOnEscape?: boolean;
		closeOnBackdropClick?: boolean;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		open = $bindable(false),
		closeOnEscape = true,
		closeOnBackdropClick = true,
		children,
		...props
	}: Props = $props();

	let dialogElement: HTMLDialogElement;

	$effect(() => {
		if (!dialogElement) return;
		
		if (open) {
			dialogElement.showModal();
		} else {
			dialogElement.close();
		}
	});

	function handleClose() {
		open = false;
	}

	function handleBackdropClick(e: MouseEvent) {
		if (!closeOnBackdropClick) return;
		
		const target = e.target as HTMLElement;
		if (target === dialogElement) {
			open = false;
		}
	}
</script>

<dialog
	bind:this={dialogElement}
	onclose={handleClose}
	oncancel={closeOnEscape ? handleClose : undefined}
	onmousedown={handleBackdropClick}
	{...props}
>
	{@render children?.()}
</dialog>

<style>
	dialog {
		padding: 0;
		border: none;
		background: transparent;
		max-width: min(100vw - 2rem, 100%);
		max-height: min(100vh - 2rem, 100%);
		margin: auto;
		overflow: visible;
		z-index: var(--z-modal);
	}	

	dialog::backdrop {
		background: var(--primary-500-alpha);
		backdrop-filter: blur(4px);
	}

	dialog[open] {
		animation: fade-in 0.2s ease;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>