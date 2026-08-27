<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import InputSelectSearch from '$lib/components/ui/select/InputSelectCustom.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'ui/InputSelectSearch',
		component: InputSelectSearch,
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
			placeholder: 'Selecciona una opcion',
			required: false,
			disabled: false,
			errors: [],
			onChange: fn(),
			onFocus: fn(),
			onBlur: fn()
		},
		argTypes: {
			optionsData: {
				control: { type: 'object' },
				description: 'Array of options with id and option properties'
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
		<InputSelectSearch
			name={args.name}
			label={args.label}
			value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args['disabled']}
			errors={args.errors}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Required" args={{ label: 'Category', required: true }}>
	{#snippet template(args)}
		<InputSelectSearch
			name={args.name}
			label={args.label}
			value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args['disabled']}
			errors={args.errors}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Preselected Value" args={{ value: 'option2' }}>
	{#snippet template(args)}
		<InputSelectSearch
			name={args.name}
			label={args.label}
			value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args['disabled']}
			errors={args.errors}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Con "ninguno" seleccionable -->
<Story name="With Null Option" args={{ nullOption: 'Ninguno', value: 'option2' }}>
	{#snippet template(args)}
		<InputSelectSearch
			name={args.name}
			label={args.label}
			value={args.value}
			nullOption={args.nullOption}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args['disabled']}
			errors={args.errors}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
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
		<InputSelectSearch
			name={args.name}
			label={args.label}
			value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args['disabled']}
			errors={args.errors}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Lista grande: donde el buscador realmente se nota -->
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
		<InputSelectSearch
			name={args.name}
			label={args.label}
			value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args['disabled']}
			errors={args.errors}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Error States -->
<Story
	name="With Single Error"
	args={{
		label: 'Priority',
		errors: ['This field is required'],
		required: true
	}}
>
	{#snippet template(args)}
		<InputSelectSearch
			name={args.name}
			label={args.label}
			value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args['disabled']}
			errors={args.errors}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
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
		<InputSelectSearch
			name={args.name}
			label={args.label}
			value={args.value}
			optionsData={args.optionsData}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args['disabled']}
			errors={args.errors}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>
