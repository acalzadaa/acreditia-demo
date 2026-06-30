<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from './InputText.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'ui/Input',
		component: Input,
		tags: ['autodocs'],
		args: {
			name: 'example',
			label: 'Label',
			value: '',
			placeholder: 'Texto',
			required: false,
			disabled: false,
			status: 'normal',
			errors: [],
			iconName: undefined,
			iconPosition: 'left',
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
			iconName: {
				control: { type: 'select' },
				options: [
					undefined,
					'menu',
					'bell',
					'chevron-down',
					'chevron-right',
					'home',
					'add',
					'add-list',
					'filter',
					'export',
					'edit',
					'close',
					'delete',
					'warning',
					'success',
					'info',
					'upload',
					'history',
					'restore',
					'detail',
					'play',
					'calendar',
					'check',
					'eye-open',
					'eye-closed'
				]
			},
			iconPosition: {
				control: { type: 'select' },
				options: ['left', 'right']
			}
		}
	});
</script>

<!-- Basic Variants -->
<Story name="Default">
	{#snippet template(args)}
		<Input
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			iconName={args.iconName}
			iconPosition={args.iconPosition}
			onInput={args['onInput']}
			oonChange={args['onChange']}
			nFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="With Label" args={{ label: 'Username' }}>
	{#snippet template(args)}
		<Input
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			iconName={args.iconName}
			iconPosition={args.iconPosition}
			onInput={args['onInput']}
			oonChange={args['onChange']}
			nFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Required" args={{ label: 'Email', required: true }}>
	{#snippet template(args)}
		<Input
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			iconName={args.iconName}
			iconPosition={args.iconPosition}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="With Placeholder" args={{ placeholder: 'Enter your name...' }}>
	{#snippet template(args)}
		<Input
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			iconName={args.iconName}
			iconPosition={args.iconPosition}
			onInput={args['onInput']}
			onChange={args['onChange']}
			nFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Without Label" args={{ label: '' }}>
	{#snippet template(args)}
		<Input
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			iconName={args.iconName}
			iconPosition={args.iconPosition}
			onInput={args['onInput']}
			oonChange={args['onChange']}
			nFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Status Variants -->
<Story name="Success Status" args={{ status: 'success', value: 'Valid input' }}>
	{#snippet template(args)}
		<Input
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			iconName={args.iconName}
			iconPosition={args.iconPosition}
			onInput={args['onInput']}
			oonChange={args['onChange']}
			nFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Error Status" args={{ status: 'error', value: 'Invalid input' }}>
	{#snippet template(args)}
		<Input
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			iconName={args.iconName}
			iconPosition={args.iconPosition}
			onInput={args['onInput']}
			oonChange={args['onChange']}
			nFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Warning Status" args={{ status: 'warning', value: 'Warning input' }}>
	{#snippet template(args)}
		<Input
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			iconName={args.iconName}
			iconPosition={args.iconPosition}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story name="Info Status" args={{ status: 'info', value: 'Info input' }}>
	{#snippet template(args)}
		<Input
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			iconName={args.iconName}
			iconPosition={args.iconPosition}
			onInput={args['onInput']}
			oonChange={args['onChange']}
			nFocus={args['onFocus']}
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
		value: ''
	}}
>
	{#snippet template(args)}
		<Input
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			iconName={args.iconName}
			iconPosition={args.iconPosition}
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
		errors: ['Username is required', 'Username must be at least 3 characters'],
		value: ''
	}}
>
	{#snippet template(args)}
		<Input
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			iconName={args.iconName}
			iconPosition={args.iconPosition}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Disabled State -->
<Story name="Disabled" args={{ disabled: true, value: 'Disabled input' }}>
	{#snippet template(args)}
		<Input
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			iconName={args.iconName}
			iconPosition={args.iconPosition}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<!-- Icon Variants -->
<Story name="With Icon Left" args={{ label: 'Search', iconName: 'home', iconPosition: 'left' }}>
	{#snippet template(args)}
		<Input
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			iconName={args.iconName}
			iconPosition={args.iconPosition}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story
	name="With Icon Right"
	args={{ label: 'Date', iconName: 'calendar', iconPosition: 'right' }}
>
	{#snippet template(args)}
		<Input
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			iconName={args.iconName}
			iconPosition={args.iconPosition}
			onInput={args['onInput']}
			onChange={args['onChange']}
			onFocus={args['onFocus']}
			onBlur={args['onBlur']}
		/>
	{/snippet}
</Story>

<Story
	name="With Icon and Error"
	args={{
		label: 'Email',
		iconName: 'warning',
		iconPosition: 'left',
		status: 'error',
		errors: ['Email inválido'],
		value: 'not-an-email'
	}}
>
	{#snippet template(args)}
		<Input
			name={args.name}
			label={args.label}
			value={args.value}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			status={args.status}
			errors={args.errors}
			iconName={args.iconName}
			iconPosition={args.iconPosition}
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
			<Input
				name={args.name}
				label={args.label}
				value={args.value}
				placeholder={args.placeholder}
				required={args.required}
				disabled={args.disabled}
				status={args.status}
				errors={args.errors}
				iconName={args.iconName}
				iconPosition={args.iconPosition}
				onInput={args['onInput']}
				onChange={args['onChange']}
				onFocus={args['onFocus']}
				onBlur={args['onBlur']}
			/>
		</div>
	{/snippet}
</Story>