<script lang="ts">
	import { tick } from 'svelte';
	import type { OptionData } from './InputSelectCustom.svelte';

	interface Props {
		/** id del panel — debe matchear el aria-controls del trigger */
		id: string;
		/** id del <label> del InputSelect, para aria-labelledby del listbox */
		labelledBy?: string;
		show: boolean;
		options: OptionData[];
		value: string;
		onSelect: (id: string) => void;
		onClose: () => void;
		emptyMessage?: string;
	}

	const {
		id,
		labelledBy,
		show,
		options,
		value,
		onSelect,
		onClose,
		emptyMessage = 'Sin opciones'
	}: Props = $props();

	// Roving tabindex: un solo <button role="option"> es tab-stop a la vez.
	let activeIndex = $state(0);
	let optionEls: (HTMLButtonElement | null)[] = [];

	let typeaheadBuffer = '';
	let typeaheadTimeout: ReturnType<typeof setTimeout>;

	// Al abrir, el foco arranca en la opción seleccionada (o la primera).
	$effect(() => {
		if (!show) return;
		const selectedIdx = options.findIndex((o) => o.id === value);
		activeIndex = selectedIdx >= 0 ? selectedIdx : 0;
		tick().then(() => optionEls[activeIndex]?.focus());
	});

	function focusIndex(i: number) {
		if (options.length === 0) return;
		const next = (i + options.length) % options.length;
		activeIndex = next;
		optionEls[next]?.focus();
	}

	function handleTypeahead(e: KeyboardEvent) {
		if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
		clearTimeout(typeaheadTimeout);
		typeaheadBuffer += e.key.toLowerCase();
		typeaheadTimeout = setTimeout(() => (typeaheadBuffer = ''), 500);

		const match = options.findIndex((o) => o.option.toLowerCase().startsWith(typeaheadBuffer));
		if (match >= 0) focusIndex(match);
	}

	function handleKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				focusIndex(activeIndex + 1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				focusIndex(activeIndex - 1);
				break;
			case 'Home':
				e.preventDefault();
				focusIndex(0);
				break;
			case 'End':
				e.preventDefault();
				focusIndex(options.length - 1);
				break;
			case 'Escape':
				e.preventDefault();
				onClose();
				break;
			case 'Tab':
				// No preventDefault: dejamos que el foco siga su curso natural,
				// solo cerramos el panel.
				onClose();
				break;
			default:
				handleTypeahead(e);
		}
	}
</script>

{#if show}
	<!--
		div + role="listbox" (no ul/li) porque el contenido son <button>,
		y <button> no es un hijo válido de <ul>. Los roles ARIA reemplazan
		la semántica nativa igual, así que el resultado es equivalente
		para lectores de pantalla.
	-->
	<div {id} class="select-options" role="listbox" aria-labelledby={labelledBy} tabindex="-1" onkeydown={handleKeydown}>
		{#if options.length === 0}
			<p class="select-options__empty text-body-small">{emptyMessage}</p>
		{:else}
			{#each options as opt, i (opt.id)}
				<button
					type="button"
					bind:this={optionEls[i]}
					class="select-option text-body"
					role="option"
					aria-selected={opt.id === value}
					tabindex={i === activeIndex ? 0 : -1}
					onclick={() => onSelect(opt.id)}
				>
					{opt.option || '\u00A0'}
				</button>
			{/each}
		{/if}
	</div>
{/if}