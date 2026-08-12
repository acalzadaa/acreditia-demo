<script lang="ts">
	/**
	 * @component InputText
	 *
	 * Campo de texto reutilizable con label, ícono opcional, mensajes de
	 * error/estado, soporte para atajo de tecla `Enter` y búsqueda "en vivo"
	 * con debounce.
	 *
	 * @example Uso básico
	 * ```svelte
	 * <InputText name="email" label="Correo" type="email" bind:value={email} />
	 * ```
	 *
	 * @example Con atajo de Enter
	 * ```svelte
	 * <InputText
	 *   name="query"
	 *   bind:value={query}
	 *   onEnter={() => ejecutarBusqueda(query)}
	 * />
	 * ```
	 *
	 * @example Con búsqueda "en vivo" (debounce)
	 * ```svelte
	 * <InputText
	 *   name="search"
	 *   type="search"
	 *   bind:value={query}
	 *   onSearch={(value) => buscarProductos(value)}
	 *   searchDelay={250}
	 * />
	 * ```
	 *
	 * @example Con errores y estado
	 * ```svelte
	 * <InputText
	 *   name="password"
	 *   type="password"
	 *   label="Contraseña"
	 *   required
	 *   status="error"
	 *   errors={['Debe tener al menos 8 caracteres']}
	 *   bind:value={password}
	 * />
	 * ```
	 */
	import type { IconName } from '../Icon.svelte';
	import Icon from '../Icon.svelte';

	type Status = 'normal' | 'success' | 'error' | 'warning' | 'info';

	/**
	 * Props del componente `InputText`.
	 *
	 * Un campo de texto genérico con soporte para label, iconos, mensajes
	 * de error/estado, atajo de tecla Enter y búsqueda "en vivo" con debounce.
	 */
	interface Props {
		/** Nombre del campo. Se usa como `id`, `name` y para vincular el `<label>` y los mensajes de error via `aria-describedby`. */
		name: string;
		/** Tipo nativo del input HTML. @default 'text' */
		type?: 'text' | 'password' | 'email' | 'url' | 'search';
		/** Texto del `<label>` mostrado arriba del input. Si se omite, no se renderiza label. */
		label?: string;
		/** Valor actual del input. Es `$bindable`, por lo que soporta `bind:value`. */
		value: string;
		/** Mensaje(s) de error a mostrar debajo del input. Acepta un string único o un array de strings. */
		errors?: string | string[];
		/** Marca el campo como obligatorio (agrega asterisco visual y atributo `required`/`aria-required`). @default false */
		required?: boolean;
		/** Texto placeholder del input. @default 'Texto' */
		placeholder?: string;
		/** Estado visual del campo, usado para estilos y clases de feedback. @default 'normal' */
		status?: Status;
		/** Deshabilita el input. @default false */
		disabled?: boolean;
		/** Clase(s) CSS adicionales aplicadas al contenedor `.form-field`. */
		class?: string;
		/** Nombre del ícono a mostrar dentro del input (ver `IconName`). */
		iconName?: IconName;
		/** Posición del ícono respecto al texto. Solo aplica si `iconName` está definido. @default 'left' */
		iconPosition?: 'left' | 'right';
		/**
		 * Callback ejecutado cuando el usuario presiona la tecla `Enter` dentro del input.
		 * Si está definida, se llama a `event.preventDefault()` para evitar el submit
		 * por defecto del formulario contenedor.
		 */
		onEnter?: () => void;
		/**
		 * Callback ejecutado con el valor actual del input mientras el usuario escribe,
		 * usando debounce (ver `searchDelay`). Útil para implementar búsqueda "en vivo".
		 * No se dispara si no está definida.
		 */
		onSearch?: (value: string) => void;
		/**
		 * Tiempo de espera (en milisegundos) sin que el usuario escriba antes de
		 * invocar `onSearch`. Solo tiene efecto si `onSearch` está definida.
		 * @default 300
		 */
		searchDelay?: number;
		/** Cualquier otro atributo HTML válido para `<input>` (se reenvía directamente, ej. `autocomplete`, `maxlength`, etc.). */
		[key: string]: unknown;
	}
	let {
		name,
		type = 'text',
		label = '',
		value = $bindable(''),
		errors = [],
		required = false,
		placeholder = 'Texto',
		status = 'normal',
		disabled = false,
		class: className = '',
		iconName,
		iconPosition = 'left',
		onEnter,
		onSearch,
		searchDelay = 300,
		...props
	}: Props = $props();

	/** `true` si se especificó un ícono para el input. */
	const hasIcon = $derived(!!iconName);

	/** Normaliza `errors` (string | string[] | undefined) siempre a un array de strings. */
	const errorList = $derived(Array.isArray(errors) ? errors : errors ? [errors] : []);

	/** `true` si hay al menos un mensaje de error para mostrar. */
	const hasErrors = $derived(errorList.length > 0);

	/**
	 * Handler de `keydown` del input.
	 * Si se presiona `Enter` y `onEnter` está definida ejecuta el callback.
	 */
	function onKeydown(event: KeyboardEvent) {
		if (onEnter && event.key === 'Enter') {
			onEnter();
		}
	}

	/** Referencia al timer activo del debounce de búsqueda. */
	let debounceTimer: ReturnType<typeof setTimeout>;

	/**
	 * Handler de `input` del input.
	 * Reinicia el debounce en cada tecla y, tras `searchDelay` ms de inactividad,
	 * invoca `onSearch` con el valor actualizado. No hace nada si `onSearch`
	 * no fue provista.
	 */
	function onInput(event: Event) {
		if (!onSearch) return;

		const newValue = (event.target as HTMLInputElement).value;

		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			onSearch(newValue);
		}, searchDelay);
	}

	$effect(() => {
		// Limpieza al destruir el componente para evitar
		// que un timer pendiente dispare después del unmount
		return () => clearTimeout(debounceTimer);
	});
</script>

<div
	class={[
		'form-field',
		className,
		{
			[`form-field--${status}`]: status !== 'normal'
		}
	]}
>
	{#if label}
		<label for={name} class="form-label text-caption">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</label>
	{/if}
	<div class="form-input-group">
		{#if hasIcon && iconPosition === 'left'}
			<span class="form-input-icon form-input-icon--left">
				<Icon name={iconName as IconName} size="sm" />
			</span>
		{/if}
		<input
			{type}
			id={name}
			{name}
			class={[
				'form-input',
				'text-body',
				{
					'form-input--with-icon-left': hasIcon && iconPosition === 'left',
					'form-input--with-icon-right': hasIcon && iconPosition === 'right'
				}
			]}
			bind:value
			{placeholder}
			{required}
			{disabled}
			aria-invalid={hasErrors ? 'true' : undefined}
			aria-required={required}
			aria-describedby={hasErrors ? `${name}-error` : undefined}
			onkeydown={onKeydown}
			oninput={onInput}
			{...props}
		/>
		{#if hasIcon && iconPosition === 'right'}
			<span class="form-input-icon form-input-icon--right">
				<Icon name={iconName as IconName} size="sm" />
			</span>
		{/if}
	</div>

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