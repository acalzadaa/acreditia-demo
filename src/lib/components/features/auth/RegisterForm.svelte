<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { registerFormSchema, type RegisterForm } from '$lib/schemas/register.schema';
	import Icon from '$lib/components/ui/Icon.svelte';
	import InputText from '$lib/components/ui/input/InputText.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		form: SuperValidated<RegisterForm>;
	}

	let { ...props }: Props = $props();

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, errors, message, enhance, constraints } = superForm(props.form, {
		validators: zod4Client(registerFormSchema),
		validationMethod: 'auto',
		customValidity: false
	});
</script>

<div class="form-container--spacious">
	<header>
		<h2 class="text-h4">Registrar Usuario</h2>
	</header>

	<form method="POST" action="?/register" use:enhance>
		<div class="modal-body">
			{#if $message}
				<div class="form-feedback form-feedback--error" role="alert">
					<Icon name="warning"></Icon>
					{$message}
				</div>
			{/if}

			<div class="form-fields">
				{#if $message}
					<div
						class={['form-feedback-container', `form-feedback--error`]}
						id="message-error"
						role="alert"
					>
						<span class="form-feedback text-body-small">
							{$message}
						</span>
					</div>
				{/if}

				<InputText
					iconName="email"
					iconPosition="left"
					label="Email"
					name="email"
					type="email"
					required={true}
					placeholder="usuario@dominio.com"
					status={$errors.email ? 'error' : 'normal'}
					disabled={false}
					bind:value={$form.email}
					errors={$errors.email}
					{...$constraints.email}
				/>

				<InputText
					iconName="password"
					iconPosition="left"
					label="Password"
					name="password"
					type="password"
					required={true}
					placeholder="********"
					status={$errors.password ? 'error' : 'normal'}
					disabled={false}
					bind:value={$form.password}
					errors={$errors.password}
					{...$constraints.password}
				/>
			</div>
		</div>

		<menu class="form-actions text-body">
			<Button type="submit" variant="primary">Registrar Usuario</Button>
		</menu>
	</form>
</div>

<style>
</style>
