<script lang="ts">
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { auth } from '$lib/stores/auth.svelte';
    import Button from '../ui/Button.svelte';
    import Input from '../ui/input/InputText.svelte';

    let email = $state('');
    let password = $state('');
    let loading = $state(false);
    let errorMsg = $state<string | null>(null);

    async function handleLogin() {
        loading = true;
        errorMsg = null;

        const { success, error } = await auth.login(email, password);

        if (success) {
            goto(resolve('/dashboard'));
        } else {
            errorMsg = error ?? 'Credenciales incorrectas';
            loading = false;
        }
    }
</script>

<div class="form-container--spacious">
    <header>
        <h2 class="text-h4">Iniciar Sesión</h2>
    </header>

    <div class="modal-body">
        <div class="form-fields">
            <Input
                label="Email"
                name="email"
                type="email"
                required
                placeholder="usuario@dominio.com"
                bind:value={email}
            />
            <Input
                label="Password"
                name="password"
                type="password"
                required
                placeholder="********"
                bind:value={password}
                errors={errorMsg ?? ''}
            />
        </div>
    </div>

    <footer class="form-actions text-body">
        <Button
            type="button"
            variant="primary"
            onClick={handleLogin}
            disabled={loading}
        >
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
        </Button>
    </footer>
</div>