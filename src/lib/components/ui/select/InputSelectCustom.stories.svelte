<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import InputSelectCustom from '$lib/components/ui/select/InputSelectCustom.svelte';

	const { Story } = defineMeta({
		title: 'ui/select/InputSelectCustom',
		component: InputSelectCustom,
		tags: ['autodocs'],
		args: {
			name: 'example',
			label: 'Select an option',
			value: '',
			optionsData: [
				{ id: 'option1', option: 'Option 1' },
				{ id: 'option2', option: 'Option 2' },
				{ id: 'option3', option: 'Option 3' },
				{ id: 'option4', option: 'Option 4' }
			],
			placeholder: 'Selecciona una opción',
			status: 'normal',
			required: false,
			disabled: false,
			errors: []
		},
		argTypes: {
			optionsData: {
				control: { type: 'object' },
				description: 'Array de opciones con propiedades id y option'
			},
			status: {
				control: { type: 'select' },
				options: ['normal', 'success', 'error', 'warning', 'info']
			},
			required: {
				control: { type: 'boolean' }
			},
			disabled: {
				control: { type: 'boolean' }
			},
			errors: {
				control: { type: 'object' }
			}
		}
	});
</script>

<!-- Basic Variants -->
<Story name="Default">
	{#snippet template(args)}
		<InputSelectCustom
			name={args.name}
			label={args.label}
			bind:value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			status={args.status}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
		/>
	{/snippet}
</Story>

<Story name="Required" args={{ label: 'Category', required: true }}>
	{#snippet template(args)}
		<InputSelectCustom
			name={args.name}
			label={args.label}
			bind:value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			status={args.status}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
		/>
	{/snippet}
</Story>

<Story name="Preselected Value" args={{ value: 'option2' }}>
	{#snippet template(args)}
		<InputSelectCustom
			name={args.name}
			label={args.label}
			bind:value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			status={args.status}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
		/>
	{/snippet}
</Story>

<!-- Con "ninguno" seleccionable -->
<Story name="With Null Option" args={{ nullOption: 'Ninguno', value: 'option2' }}>
	{#snippet template(args)}
		<InputSelectCustom
			name={args.name}
			label={args.label}
			bind:value={args.value}
			nullOption={args.nullOption}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			status={args.status}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
		/>
	{/snippet}
</Story>

<!-- Distintos conjuntos de datos -->
<Story
	name="Countries"
	args={{
		label: 'Country',
		optionsData: [
			{ id: 'mx', option: 'México' },
			{ id: 'us', option: 'United States' },
			{ id: 'ca', option: 'Canada' },
			{ id: 'br', option: 'Brazil' },
			{ id: 'ar', option: 'Argentina' }
		]
	}}
>
	{#snippet template(args)}
		<InputSelectCustom
			name={args.name}
			label={args.label}
			bind:value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			status={args.status}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
		/>
	{/snippet}
</Story>

<!-- Lista grande: para revisar scroll y navegación con teclado -->
<Story
	name="Large Options List"
	args={{
		label: 'Select a product',
		optionsData: Array.from({ length: 100 }, (_, i) => ({
			id: `product-${i + 1}`,
			option: `Product ${i + 1} - ${['Electronics', 'Clothing', 'Books', 'Food'][i % 4]}`
		}))
	}}
>
	{#snippet template(args)}
		<InputSelectCustom
			name={args.name}
			label={args.label}
			bind:value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			status={args.status}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
		/>
	{/snippet}
</Story>

<!-- Status Variants -->
<Story name="Success" args={{ label: 'Status', status: 'success', value: 'option1' }}>
	{#snippet template(args)}
		<InputSelectCustom
			name={args.name}
			label={args.label}
			bind:value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			status={args.status}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
		/>
	{/snippet}
</Story>

<Story name="Warning" args={{ label: 'Status', status: 'warning', value: 'option1' }}>
	{#snippet template(args)}
		<InputSelectCustom
			name={args.name}
			label={args.label}
			bind:value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			status={args.status}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
		/>
	{/snippet}
</Story>

<!-- Error States -->
<Story
	name="With Single Error"
	args={{
		label: 'Priority',
		status: 'error',
		errors: ['This field is required'],
		required: true
	}}
>
	{#snippet template(args)}
		<InputSelectCustom
			name={args.name}
			label={args.label}
			bind:value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			status={args.status}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
		/>
	{/snippet}
</Story>

<Story
	name="With Multiple Errors"
	args={{
		label: 'Priority',
		status: 'error',
		errors: ['This field is required', 'Value must be one of the listed options'],
		required: true
	}}
>
	{#snippet template(args)}
		<InputSelectCustom
			name={args.name}
			label={args.label}
			bind:value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			status={args.status}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
		/>
	{/snippet}
</Story>

<!-- Disabled State -->
<Story
	name="Disabled"
	args={{
		label: 'Role',
		disabled: true,
		value: 'option2'
	}}
>
	{#snippet template(args)}
		<InputSelectCustom
			name={args.name}
			label={args.label}
			bind:value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			status={args.status}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
		/>
	{/snippet}
</Story>

<!-- Sin label -->
<Story name="Without Label" args={{ label: '' }}>
	{#snippet template(args)}
		<InputSelectCustom
			name={args.name}
			label={args.label}
			bind:value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			status={args.status}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
		/>
	{/snippet}
</Story>