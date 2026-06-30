<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import InputNumber from './InputNumber.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'ui/InputNumber',
		component: InputNumber,
		tags: ['autodocs'],
		args: {
			name: 'number',
			label: 'Number',
			value: null,
			placeholder: '0',
			required: false,
			disabled: false,
			status: 'normal',
			errors: [],
			min: undefined,
			max: undefined,
			step: 1,
			onInput: fn(),
			onChange: fn(),
			onFocus: fn(),
			onBlur: fn()
		},
		argTypes: {
			status: {
				control: { type: 'select' },
				options: ['normal', 'success', 'error', 'warning', 'info']
			},
			errors: {
				control: { type: 'object' }
			},
			required: {
				control: { type: 'boolean' }
			},
			disabled: {
				control: { type: 'boolean' }
			},
			min: {
				control: { type: 'number' }
			},
			max: {
				control: { type: 'number' }
			},
			step: {
				control: { type: 'number' }
			}
		}
	});
</script>

<!-- Basic Variants -->
<Story name="Default">
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="With Label" args={{ label: 'Quantity' }}>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="With Value" args={{ value: 42 }}>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Required" args={{ label: 'Age', required: true }}>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="With Placeholder" args={{ placeholder: 'Enter a number...' }}>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Without Label" args={{ label: '' }}>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Validation Variants -->
<Story name="With Min Value" args={{ min: 0, value: 5, label: 'Minimum 0' }}>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="With Max Value" args={{ max: 100, value: 50, label: 'Maximum 100' }}>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="With Range" args={{ min: 0, max: 10, value: 5, label: 'Range 0-10' }}>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="With Step" args={{ step: 5, value: 10, label: 'Step 5' }}>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Decimal Step" args={{ step: 0.5, value: 2.5, label: 'Step 0.5' }}>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Status Variants -->
<Story name="Success Status" args={{ status: 'success', value: 42, label: 'Valid number' }}>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Error Status" args={{ status: 'error', value: 999, label: 'Invalid number' }}>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Warning Status" args={{ status: 'warning', value: 75, label: 'Warning threshold' }}>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Info Status" args={{ status: 'info', value: 100, label: 'Info number' }}>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Error Messages -->
<Story
	name="With Single Error"
	args={{
		status: 'error',
		errors: ['This field is required'],
		value: null,
		label: 'Age'
	}}
>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story
	name="With Multiple Errors"
	args={{
		status: 'error',
		errors: ['Must be a number', 'Must be between 1 and 100'],
		value: 'invalid',
		label: 'Score'
	}}
>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story
	name="Range Validation Error"
	args={{
		status: 'error',
		errors: ['Value must be between 0 and 10'],
		value: 15,
		label: 'Rating',
		min: 0,
		max: 10
	}}
>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Disabled State -->
<Story name="Disabled" args={{ disabled: true, value: 42, label: 'Read-only value' }}>
	{#snippet template(args)}
		<InputNumber
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			min={args.min}
			max={args.max}
			step={args.step}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Interactive Example -->
<Story name="Interactive">
	{#snippet template(args)}
		<div style="max-width: 300px;">
			<InputNumber
				name={args.name}
				label={args.label}
				value={args.value}
				placeholder={args.placeholder}
				required={args.required}
				disabled={args.disabled}
				status={args.status}
				errors={args.errors}
				min={args.min}
				max={args.max}
				step={args.step}
				onInput={args['onInput']}
				onChange={args['onChange']}
				onFocus={args['onFocus']}
				onBlur={args['onBlur']}
			/>
		</div>
	{/snippet}
</Story>
