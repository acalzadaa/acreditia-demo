<!--
@component
# AccordionHeader
Cubre las variantes 1 y 2 del header de accordion:
1. Solo texto (título/subtítulo).
2. Texto + un botón de acción a la derecha (ej. "agregar elemento"),
   vía el snippet `action`.

No es clickeable como bloque; para el header-botón de expand, usar
AccordionHeaderClickable.
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		subtitle?: string;
		title: string;
		/** Ej. un IconButton de "agregar". Si no se pasa, el header es solo texto. */
		action?: Snippet;
		/** Ej. un <Badge> de estatus, debajo del título. */
		children?: Snippet;
		class?: string;
	}

	const { subtitle, title, action, children, class: className = '' }: Props = $props();
</script>

<header class={['panel-header', className]}>
	<div class="panel-header__text">
		{#if subtitle}
			<span class="panel-header__subtitle text-caption">{subtitle}</span>
		{/if}
		<h3 class="panel-header__title text-h6">{title}</h3>
		{#if children}
			<div class="panel-header__metadata">
				{@render children()}
			</div>
		{/if}
	</div>
	{#if action}
		<div class="panel-header__action">
			{@render action()}
		</div>
	{/if}
</header>
