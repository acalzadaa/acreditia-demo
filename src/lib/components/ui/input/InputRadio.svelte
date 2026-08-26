<script lang="ts">
	/**
	 * Posibles estados visuales del campo, reutilizan las clases
	 * `.form-feedback--{status}` / `.form-field--{status}` definidas en form.css.
	 */
	type Status = 'normal' | 'success' | 'error' | 'warning' | 'info';

	/**
	 * Props del componente InputRadio.
	 *
	 * A diferencia de InputCheckbox, `group` no es un array: en un radio,
	 * `group` representa el valor único seleccionado dentro de todos los
	 * inputs que comparten el mismo `name`. Svelte 5 resuelve el binding
	 * de `bind:group` de forma distinta según `type="checkbox"` (array)
	 * o `type="radio"` (valor único) automáticamente.
	 */
	interface Props {
		/** Nombre del input. Todos los radios de un mismo grupo deben compartir el mismo `name`. */
		name: string;
		/** Texto visible junto al radio. Si no se pasa, el radio se renderiza sin label. */
		label?: string;
		/**
		 * Valor único seleccionado del grupo de radios (bindable).
		 * Cuando este radio está seleccionado, `group === value`.
		 */
		group?: unknown;
		/** Valor que representa esta opción dentro del grupo. */
		value?: unknown;
		/** Mensaje(s) de error a mostrar. Acepta un string único o un array de strings. */
		errors?: string | string[];
		/** Marca el campo como requerido (agrega asterisco visual y `aria-required`). */
		required?: boolean;
		/** Estado visual del feedback (color de mensajes de error/success/etc). */
		status?: Status;
		/** Deshabilita el input y aplica estilos de disabled. */
		disabled?: boolean;
		/** Callback ejecutado en el evento `change` del input nativo. */
		onChange?: () => void;
		/** Clase(s) adicionales para el contenedor `.form-field`. */
		class?: string;
		/** Resto de atributos/props se pasan directo al `<input>` (ej. `data-*`, `aria-*`). */
		[key: string]: unknown;
	}

	let {
		name,
		label = '',
		group = $bindable(undefined),
		value,
		errors = [],
		required = false,
		status = 'normal',
		disabled = false,
		onChange,
		class: className = '',
		...props
	}: Props = $props();

	/** Normaliza `errors` siempre a `string[]` para simplificar el render. */
	const errorList = $derived(Array.isArray(errors) ? errors : errors ? [errors] : []);

	/** Indica si el campo tiene errores a mostrar. */
	const hasErrors = $derived(errorList.length > 0);
</script>

<div class={['form-field', className]}>
	<label
		for={name}
		class={[
			'form-check',
			{
				'form-check--disabled': disabled
			}
		]}
	>
		<input
			type="radio"
			id={name}
			{name}
			class="form-check-input"
			{value}
			bind:group
			{required}
			{disabled}
			onchange={onChange}
			aria-describedby={hasErrors ? `${name}-error` : undefined}
			{...props}
		/>

		{#if label}
			<span
				class={[
					'form-check-label',
					'text-body',
					{
						'form-check-label--disabled': disabled
					}
				]}
			>
				{label}
				{#if required}
					<span class="required">*</span>
				{/if}
			</span>
		{/if}
	</label>

	{#if hasErrors}
		<div class="form-feedback-container" id="{name}-error" role="alert">
			{#each errorList as err (err)}
				<span class="form-feedback form-feedback--{status} text-body-small">
					{err}
				</span>
			{/each}
		</div>
	{/if}
</div>
