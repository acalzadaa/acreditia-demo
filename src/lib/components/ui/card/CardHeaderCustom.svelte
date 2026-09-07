<!--
@component CardHeaderCustom
Encabezado personalizable con tres secciones diferenciadas visualmente.

## Descripción
Componente diseñado para estructurar encabezados de tarjetas con jerarquía visual clara. 
Organiza el contenido en tres secciones independientes, cada una con su propio estilo y propósito.

## Estructura
- **Title**: Sección principal con énfasis visual (color primario)
- **Subtitle**: Sección secundaria debajo del título (color secundario)  
- **Metadata**: Contenedor para elementos de estado (badges, iconos, etiquetas)

## Estilos base

```css
.card-header {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: var(--space-1);
	padding-bottom: var(--card-section-gap);
}
```

Cada sección aplica automáticamente su estilo correspondiente.

Ejemplo de uso:

```svelte
<CardHeaderCustom 
	title="Dashboard" 
	subtitle="Resumen de actividad diaria"
>
	<Badge color="green">Activo</Badge>
	<Icon name="bell" />
</CardHeaderCustom>
Props
title (Snippet): Contenido principal, se muestra con estilo prominente

subtitle (Snippet): Contenido secundario debajo del título

children (Snippet): Elementos de metadata (badges, iconos, etc.)

class (string): Clases CSS adicionales para personalización
```

## Estilos por sección
- Title: `color: var(--color-primary)` o equivalente
- Subtitle: `color: var(--color-secondary)` o equivalente
- Metadata: `display: flex; gap: var(--space-1); align-items: center;`

## Notas
- Todas las secciones son opcionales
- Metadata se renderiza en un contenedor con clase `.card-header__metadata`
- El espaciado entre secciones es controlado por `var(--space-1)`
- El padding inferior usa `var(--card-section-gap)`
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** titulo y/o subtitulo */
		title?: Snippet;
		subtitle?: Snippet;
		/** Ej. un <Badge> de estatus. */

		children?: Snippet;
		class?: string;
	}

	const { subtitle, title, children, class: className = '' }: Props = $props();
</script>

<header class={['card-header', className]}>
	{#if title}
		<div class="card-header__title text-h6">
			{@render title()}
		</div>
	{/if}
	{#if subtitle}
		<div class="card-header__subtitle text-body">
			{@render subtitle()}
		</div>
	{/if}
	{#if children}
		<div class="card-header__metadata">
			{@render children()}
		</div>
	{/if}
</header>
