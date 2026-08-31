<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import InputSelectBase from './InputSelectBase.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'ui/InputSelectBase',
		component: InputSelectBase,
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
		<InputSelectBase
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

<Story name="With Label" args={{ label: 'Country' }}>
	{#snippet template(args)}
		<InputSelectBase
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
		<InputSelectBase
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

<Story name="With Custom Placeholder" args={{ placeholder: '-- Please select --' }}>
	{#snippet template(args)}
		<InputSelectBase
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
		<InputSelectBase
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

<!-- Different Data Sets -->
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
		<InputSelectBase
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

<Story
	name="Numbers"
	args={{
		label: 'Quantity',
		optionsData: [
			{ id: '1', option: '1 item' },
			{ id: '2', option: '2 items' },
			{ id: '3', option: '3 items' },
			{ id: '4', option: '4 items' },
			{ id: '5', option: '5 items' }
		]
	}}
>
	{#snippet template(args)}
		<InputSelectBase
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
		<InputSelectBase
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

<Story
	name="With Multiple Errors"
	args={{
		label: 'Department',
		errors: ['Please select a department', 'This selection requires manager approval'],
		required: true
	}}
>
	{#snippet template(args)}
		<InputSelectBase
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
		<InputSelectBase
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

<!-- Without Label -->
<Story name="Without Label" args={{ label: '' }}>
	{#snippet template(args)}
		<InputSelectBase
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

<!-- Large Options List -->
<Story
	name="Large Options List"
	args={{
		label: 'Select a product',
		optionsData: Array.from({ length: 20 }, (_, i) => ({
			id: `product-${i + 1}`,
			option: `Product ${i + 1} - ${['Electronics', 'Clothing', 'Books', 'Food'][i % 4]}`
		}))
	}}
>
	{#snippet template(args)}
		<InputSelectBase
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
