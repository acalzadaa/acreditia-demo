<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DatePickerInput from './DatePickerInput.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'ui/DatePickerInput',
		component: DatePickerInput,
		tags: ['autodocs'],
		args: {
			name: 'date-picker',
			label: 'Selecciona una fecha',
			singleMode: false,
			placeholder: '',
			required: false,
			disabled: false,
			errors: [],
			status: 'normal',
			minDate: null,
			maxDate: null,
			disabledDates: null,
			firstDayOfWeek: 1,
			locale: 'es-MX',
			startDate: null,
			endDate: null,
			onchange: fn()
		},
		argTypes: {
			status: {
				control: { type: 'select' },
				options: ['normal', 'success', 'error', 'warning', 'info']
			},
			errors: {
				control: { type: 'object' }
			},
			singleMode: {
				control: { type: 'boolean' }
			},
			required: {
				control: { type: 'boolean' }
			},
			disabled: {
				control: { type: 'boolean' }
			},
			firstDayOfWeek: {
				control: { type: 'number', min: 0, max: 6 }
			},
			locale: {
				control: { type: 'text' }
			}
		}
	});
</script>

<!-- Basic Variants -->
<Story name="Default">
	{#snippet template(args)}
		<DatePickerInput
			name={args.name}
			label={args.label}
			singleMode={args.singleMode}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
			status={args.status}
			minDate={args.minDate}
			maxDate={args.maxDate}
			disabledDates={args.disabledDates}
			firstDayOfWeek={args.firstDayOfWeek}
			locale={args.locale}
			bind:startDate={args.startDate}
			bind:endDate={args.endDate}
			onchange={args.onchange}
		/>
	{/snippet}
</Story>

<Story name="Single Mode" args={{ singleMode: true, label: 'Fecha de nacimiento' }}>
	{#snippet template(args)}
		<DatePickerInput
			name={args.name}
			label={args.label}
			singleMode={args.singleMode}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
			status={args.status}
			minDate={args.minDate}
			maxDate={args.maxDate}
			disabledDates={args.disabledDates}
			firstDayOfWeek={args.firstDayOfWeek}
			locale={args.locale}
			bind:startDate={args.startDate}
			bind:endDate={args.endDate}
			onchange={args.onchange}
		/>
	{/snippet}
</Story>

<Story name="Without Label" args={{ label: '' }}>
	{#snippet template(args)}
		<DatePickerInput
			name={args.name}
			label={args.label}
			singleMode={args.singleMode}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
			status={args.status}
			minDate={args.minDate}
			maxDate={args.maxDate}
			disabledDates={args.disabledDates}
			firstDayOfWeek={args.firstDayOfWeek}
			locale={args.locale}
			bind:startDate={args.startDate}
			bind:endDate={args.endDate}
			onchange={args.onchange}
		/>
	{/snippet}
</Story>

<Story name="Required" args={{ label: 'Rango de estadía', required: true }}>
	{#snippet template(args)}
		<DatePickerInput
			name={args.name}
			label={args.label}
			singleMode={args.singleMode}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
			status={args.status}
			minDate={args.minDate}
			maxDate={args.maxDate}
			disabledDates={args.disabledDates}
			firstDayOfWeek={args.firstDayOfWeek}
			locale={args.locale}
			bind:startDate={args.startDate}
			bind:endDate={args.endDate}
			onchange={args.onchange}
		/>
	{/snippet}
</Story>

<Story name="With Custom Placeholder" args={{ placeholder: 'Elige tus fechas...' }}>
	{#snippet template(args)}
		<DatePickerInput
			name={args.name}
			label={args.label}
			singleMode={args.singleMode}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
			status={args.status}
			minDate={args.minDate}
			maxDate={args.maxDate}
			disabledDates={args.disabledDates}
			firstDayOfWeek={args.firstDayOfWeek}
			locale={args.locale}
			bind:startDate={args.startDate}
			bind:endDate={args.endDate}
			onchange={args.onchange}
		/>
	{/snippet}
</Story>

<!-- Preselected Values -->
<Story
	name="With Preselected Range"
	args={{
		label: 'Rango preseleccionado',
		startDate: new Date(2026, 6, 10),
		endDate: new Date(2026, 6, 15)
	}}
>
	{#snippet template(args)}
		<DatePickerInput
			name={args.name}
			label={args.label}
			singleMode={args.singleMode}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
			status={args.status}
			minDate={args.minDate}
			maxDate={args.maxDate}
			disabledDates={args.disabledDates}
			firstDayOfWeek={args.firstDayOfWeek}
			locale={args.locale}
			bind:startDate={args.startDate}
			bind:endDate={args.endDate}
			onchange={args.onchange}
		/>
	{/snippet}
</Story>

<Story
	name="With Preselected Single Date"
	args={{
		singleMode: true,
		label: 'Fecha preseleccionada',
		startDate: new Date(2026, 6, 10)
	}}
>
	{#snippet template(args)}
		<DatePickerInput
			name={args.name}
			label={args.label}
			singleMode={args.singleMode}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
			status={args.status}
			minDate={args.minDate}
			maxDate={args.maxDate}
			disabledDates={args.disabledDates}
			firstDayOfWeek={args.firstDayOfWeek}
			locale={args.locale}
			bind:startDate={args.startDate}
			bind:endDate={args.endDate}
			onchange={args.onchange}
		/>
	{/snippet}
</Story>

<!-- Constraints -->
<Story
	name="With Min/Max Dates"
	args={{
		label: 'Solo fechas de julio 2026',
		minDate: new Date(2026, 6, 1),
		maxDate: new Date(2026, 6, 31)
	}}
>
	{#snippet template(args)}
		<DatePickerInput
			name={args.name}
			label={args.label}
			singleMode={args.singleMode}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
			status={args.status}
			minDate={args.minDate}
			maxDate={args.maxDate}
			disabledDates={args.disabledDates}
			firstDayOfWeek={args.firstDayOfWeek}
			locale={args.locale}
			bind:startDate={args.startDate}
			bind:endDate={args.endDate}
			onchange={args.onchange}
		/>
	{/snippet}
</Story>

<Story
	name="With Disabled Dates"
	args={{
		label: 'Con fechas bloqueadas',
		singleMode: true,
		disabledDates: [new Date(2026, 6, 14), new Date(2026, 6, 15), new Date(2026, 6, 16)]
	}}
>
	{#snippet template(args)}
		<DatePickerInput
			name={args.name}
			label={args.label}
			singleMode={args.singleMode}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
			status={args.status}
			minDate={args.minDate}
			maxDate={args.maxDate}
			disabledDates={args.disabledDates}
			firstDayOfWeek={args.firstDayOfWeek}
			locale={args.locale}
			bind:startDate={args.startDate}
			bind:endDate={args.endDate}
			onchange={args.onchange}
		/>
	{/snippet}
</Story>

<Story name="Sunday First" args={{ label: 'Semana inicia en domingo', firstDayOfWeek: 0 }}>
	{#snippet template(args)}
		<DatePickerInput
			name={args.name}
			label={args.label}
			singleMode={args.singleMode}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
			status={args.status}
			minDate={args.minDate}
			maxDate={args.maxDate}
			disabledDates={args.disabledDates}
			firstDayOfWeek={args.firstDayOfWeek}
			locale={args.locale}
			bind:startDate={args.startDate}
			bind:endDate={args.endDate}
			onchange={args.onchange}
		/>
	{/snippet}
</Story>

<!-- Status Variants -->
<Story name="Success Status" args={{ status: 'success', startDate: new Date(2026, 6, 10) }}>
	{#snippet template(args)}
		<DatePickerInput
			name={args.name}
			label={args.label}
			singleMode={args.singleMode}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
			status={args.status}
			minDate={args.minDate}
			maxDate={args.maxDate}
			disabledDates={args.disabledDates}
			firstDayOfWeek={args.firstDayOfWeek}
			locale={args.locale}
			bind:startDate={args.startDate}
			bind:endDate={args.endDate}
			onchange={args.onchange}
		/>
	{/snippet}
</Story>

<Story
	name="With Error"
	args={{
		status: 'error',
		errors: ['Debes seleccionar un rango de fechas válido'],
		label: 'Rango de fechas'
	}}
>
	{#snippet template(args)}
		<DatePickerInput
			name={args.name}
			label={args.label}
			singleMode={args.singleMode}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
			status={args.status}
			minDate={args.minDate}
			maxDate={args.maxDate}
			disabledDates={args.disabledDates}
			firstDayOfWeek={args.firstDayOfWeek}
			locale={args.locale}
			bind:startDate={args.startDate}
			bind:endDate={args.endDate}
			onchange={args.onchange}
		/>
	{/snippet}
</Story>

<!-- Disabled State -->
<Story
	name="Disabled"
	args={{ disabled: true, label: 'No editable', startDate: new Date(2026, 6, 10), endDate: new Date(2026, 6, 15) }}
>
	{#snippet template(args)}
		<DatePickerInput
			name={args.name}
			label={args.label}
			singleMode={args.singleMode}
			placeholder={args.placeholder}
			required={args.required}
			disabled={args.disabled}
			errors={args.errors}
			status={args.status}
			minDate={args.minDate}
			maxDate={args.maxDate}
			disabledDates={args.disabledDates}
			firstDayOfWeek={args.firstDayOfWeek}
			locale={args.locale}
			bind:startDate={args.startDate}
			bind:endDate={args.endDate}
			onchange={args.onchange}
		/>
	{/snippet}
</Story>

<!-- Interactive Example -->
<Story name="Interactive">
	{#snippet template(args)}
		<div style="max-width: 320px;">
			<DatePickerInput
				name={args.name}
				label={args.label}
				singleMode={args.singleMode}
				placeholder={args.placeholder}
				required={args.required}
				disabled={args.disabled}
				errors={args.errors}
				status={args.status}
				minDate={args.minDate}
				maxDate={args.maxDate}
				disabledDates={args.disabledDates}
				firstDayOfWeek={args.firstDayOfWeek}
				locale={args.locale}
				bind:startDate={args.startDate}
				bind:endDate={args.endDate}
				onchange={args.onchange}
			/>
		</div>
	{/snippet}
</Story>