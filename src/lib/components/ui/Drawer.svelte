<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		show: boolean;
		/** Esquina desde la que "cuelga" el drawer */
		position?: 'top-left' | 'top-right';
		/** Ancho del drawer (cualquier valor CSS válido: '400px', '30vw', etc.) */
		width?: string;
		/** Distancia desde arriba (cualquier valor CSS válido, admite calc()) */
		top?: string;
		ariaLabel?: string;
		header?: Snippet;
		children?: Snippet;
	}

	const {
		show,
		position = 'top-right',
		width = '400px',
		top = '0px',
		ariaLabel = 'Panel',
		header,
		children
	}: Props = $props();
</script>

{#if show}
	<section
		class="drawer-panel drawer-panel--{position}"
		style:width
		style:top
		aria-label={ariaLabel}
	>
		{#if header}
			<div class="drawer-panel--header text-body">
				{@render header()}
			</div>
		{/if}
		<div class="drawer-panel--content text-body">
			{@render children?.()}
		</div>
	</section>
{/if}

<style>
	.drawer-panel {
		position: absolute;
		display: flex;
		flex-direction: column;
		box-shadow: var(--shadow-md);
		border: var(--border-width-thin) solid var(--border-light);
		z-index: var(--z-drawer);
		background-color: var(--bg-drawer);
		animation: slideDown 0.3s ease-in-out;
		/* .drawer-panel--content maneja su propio scroll si el contenido crece */
		max-height: calc(100vh - var(--header-height, 0px));
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* ── Posición: esquina desde la que cuelga ──────────────────────── */
	.drawer-panel--top-right {
		right: 0;
		border-top-left-radius: var(--border-radius-lg);
		border-bottom-left-radius: var(--border-radius-lg);
	}

	.drawer-panel--top-left {
		left: 0;
		border-top-right-radius: var(--border-radius-lg);
		border-bottom-right-radius: var(--border-radius-lg);
	}

	.drawer-panel--header {
		padding: var(--space-4);
		text-align: left;
		border-bottom: var(--border-width-thin) solid var(--border-regular);
		background-color: var(--bg-drawer);
	}

	.drawer-panel--content {
		padding: 0 var(--space-4) var(--space-4) var(--space-4);
		overflow-y: auto;
	}
</style>