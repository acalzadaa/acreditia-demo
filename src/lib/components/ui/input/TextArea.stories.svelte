<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
    import TextArea from './TextArea.svelte';

	const { Story } = defineMeta({
		title: 'ui/TextArea',
		component: TextArea,
		tags: ['autodocs'],
		args: {
			name: 'description',
			label: 'Descripción',
			value: '',
			placeholder: 'Escribe tu descripción aquí...',
			required: false,
			disabled: false,
			rows: 4,
			maxLength: 200,
			showCounter: true,
			errors: [],
			status: 'normal',
			onInput: fn(),
			onFocus: fn(),
			onBlur: fn()
		},
		argTypes: {
			rows: {
				control: { type: 'number', min: 1, max: 20 },
				description: 'Number of visible text rows'
			},
			maxLength: {
				control: { type: 'number', min: 1, max: 1000 },
				description: 'Maximum number of characters allowed'
			},
			showCounter: {
				control: { type: 'boolean' },
				description: 'Show character counter'
			},
			required: {
				control: { type: 'boolean' }
			},
			disabled: {
				control: { type: 'boolean' }
			},
			errors: {
				control: { type: 'object' }
			},
			status: {
				control: { type: 'select' },
				options: ['normal', 'success', 'error', 'warning', 'info'],
				description: 'Visual status of the textarea'
			}
		}
	});
</script>

<!-- Basic Variants -->
<Story name="Default">
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="With Custom Label" args={{ label: 'Project Description' }}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Required" args={{ required: true }}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="With Custom Placeholder" args={{ placeholder: 'Escribe algo aquí...' }}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="With Preselected Value" args={{ value: 'Este es un texto de ejemplo que ya viene precargado en el textarea.' }}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Character Limit Variants -->
<Story name="Custom Max Length (100)" args={{ maxLength: 100, label: 'Bio (max 100 chars)' }}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Without Counter" args={{ showCounter: false, label: 'Sin contador' }}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="No Max Limit" args={{ maxLength: null, showCounter: false, label: 'Sin límite de caracteres' }}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Row Variants -->
<Story name="Small (3 rows)" args={{ rows: 3, label: 'Comentario rápido' }}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Large (8 rows)" args={{ rows: 8, label: 'Contenido largo' }}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Status Variants -->
<Story name="Success Status" args={{ status: 'success', label: 'Campo válido', value: 'Texto correcto' }}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Warning Status" args={{ status: 'warning', label: 'Advertencia', value: 'Texto con advertencia' }}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Info Status" args={{ status: 'info', label: 'Información', value: 'Texto informativo' }}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Error States -->
<Story name="With Single Error" args={{ 
	label: 'Descripción',
	errors: ['La descripción es requerida'],
	required: true,
	status: 'error'
}}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="With Multiple Errors" args={{ 
	label: 'Comentarios',
	errors: ['El comentario es muy corto', 'Debe tener al menos 10 caracteres', 'No se permiten caracteres especiales'],
	value: 'Hola',
	status: 'error'
}}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Error with Counter Warning" args={{ 
	label: 'Mensaje',
	errors: ['El mensaje excede el límite de caracteres'],
	value: 'Este es un texto muy largo que excede el límite de caracteres permitidos para demostrar el comportamiento de error combinado con el contador.',
	maxLength: 50,
	status: 'error'
}}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Disabled State -->
<Story name="Disabled" args={{ 
	label: 'Campo deshabilitado',
	disabled: true,
	value: 'Este texto no se puede editar'
}}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Disabled with Error" args={{ 
	label: 'Campo deshabilitado con error',
	disabled: true,
	errors: ['Error persistente'],
	value: 'Texto con error',
	status: 'error'
}}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Without Label -->
<Story name="Without Label" args={{ label: '' }}>
	{#snippet template(args)}
		<TextArea
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			rows={args.rows}
			maxLength={args.maxLength}
			showCounter={args.showCounter}
			errors={args.errors}
			status={args.status}
			onInput={args['onInput']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Real World Examples -->
<Story name="Contact Form Example" args={{ 
	label: 'Mensaje',
	name: 'message',
	placeholder: 'Escribe tu mensaje aquí...',
	rows: 6,
	maxLength: 500,
	required: true
}}>
	{#snippet template(args)}
		<div style="max-width: 600px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
			<h3 style="margin-bottom: 20px;">Contacto</h3>
			<TextArea
				name={args.name}
				label={args.label}
				value={args.value}
				placeholder={args.placeholder}
				required={args.required}
				disabled={args.disabled}
				rows={args.rows}
				maxLength={args.maxLength}
				showCounter={args.showCounter}
				errors={args.errors}
				status={args.status}
				onInput={args['onInput']}
				onFocus={args['onFocus']}
				onBlur={args['onBlur']}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Review Form Example" args={{ 
	label: 'Tu reseña',
	name: 'review',
	placeholder: 'Comparte tu experiencia con el producto...',
	rows: 5,
	maxLength: 300,
	showCounter: true
}}>
	{#snippet template(args)}
		<div style="max-width: 500px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
			<h3 style="margin-bottom: 20px;">Escribe una reseña</h3>
			<TextArea
				name={args.name}
				label={args.label}
				value={args.value}
				placeholder={args.placeholder}
				required={args.required}
				disabled={args.disabled}
				rows={args.rows}
				maxLength={args.maxLength}
				showCounter={args.showCounter}
				errors={args.errors}
				status={args.status}
				onInput={args['onInput']}
				onFocus={args['onFocus']}
				onBlur={args['onBlur']}
			/>
		</div>
	{/snippet}
</Story>