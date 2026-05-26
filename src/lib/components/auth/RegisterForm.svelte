<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import Button from '../ui/Button.svelte';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import Input from '../ui/input/InputText.svelte';
	import { registerFormSchema, type RegisterForm } from '$lib/schemas/register.schema';
	import Icon from '../ui/Icon.svelte';

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
					<Icon name='warning'></Icon>
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

				<Input
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

				<Input
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

		<footer class="form-actions text-body">
			<Button type="submit" variant="primary">Registrar Usuario</Button>
		</footer>
	</form>
</div>

<style>
</style>
