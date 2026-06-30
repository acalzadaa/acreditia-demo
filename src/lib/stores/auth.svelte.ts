// lib/stores/auth.svelte.ts
import * as netlifyIdentity from '@netlify/identity';
import type { User, AuthEvent, CallbackResult } from '@netlify/identity';

// Tipo para el estado interno del store
interface AuthState {
	user: User | null;
	loading: boolean;
	initialized: boolean;
}

// Tipo para respuestas de operaciones
interface AuthOperationResult {
	success: boolean;
	error: string | null;
	user?: User | null;
}

class AuthStore {
	private state = $state<AuthState>({
		user: null,
		loading: false,
		initialized: false
	});

	private unsubscribe: (() => void) | null = null;

	constructor() {
		if (typeof window !== 'undefined') {
			this.initialize();
		}
	}

	// Getters reactivos
	get user() {
		return this.state.user;
	}

	get loading() {
		return this.state.loading;
	}

	get initialized() {
		return this.state.initialized;
	}

	get isAuthenticated(): boolean {
		return this.state.user !== null;
	}

	private async initialize(): Promise<void> {
		try {
			this.state.loading = true;

			// Hydrate session from cookies (importante para SSR/SPA híbrido)
			await netlifyIdentity.hydrateSession();

			// Obtener usuario actual
			const currentUser = await netlifyIdentity.getUser();

			this.state.user = currentUser;
			this.state.initialized = true;

			// Suscribirse a cambios de autenticación
			this.unsubscribe = netlifyIdentity.onAuthChange((event: AuthEvent, user: User | null) => {
				this.handleAuthEvent(event, user);
			});
		} catch (error) {
			console.error('Error initializing auth:', error);
			this.state.initialized = true;
		} finally {
			this.state.loading = false;
		}
	}

	private handleAuthEvent(event: AuthEvent, user: User | null): void {
		switch (event) {
			case 'login':
				this.state.user = user;
				this.state.loading = false;
				break;
			case 'logout':
				this.state.user = null;
				this.state.loading = false;
				break;
			case 'user_updated':
				this.state.user = user;
				break;
			case 'token_refresh':
				// Solo actualizamos el usuario si tenemos uno
				if (user) {
					this.state.user = user;
				}
				break;
			case 'recovery':
				// Usuario autenticado pero necesita cambiar password
				this.state.user = user;
				break;
		}
	}

	// ============ MÉTODOS PÚBLICOS ============

	async login(email: string, password: string): Promise<AuthOperationResult> {
		try {
			this.state.loading = true;

			const user = await netlifyIdentity.login(email, password);
			this.state.user = user;

			return {
				success: true,
				error: null,
				user
			};
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Error de autenticación';
			return {
				success: false,
				error: errorMessage,
				user: null
			};
		} finally {
			this.state.loading = false;
		}
	}

	async signUp(
		email: string,
		password: string,
		metadata?: Record<string, unknown>
	): Promise<AuthOperationResult> {
		try {
			this.state.loading = true;

			const user = await netlifyIdentity.signup(email, password, metadata);

			// Si autoconfirm está activado, el usuario ya está logueado
			if (user) {
				this.state.user = user;
			}

			return {
				success: true,
				error: null,
				user
			};
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Error al registrar usuario';
			return {
				success: false,
				error: errorMessage,
				user: null
			};
		} finally {
			this.state.loading = false;
		}
	}

	async logout(): Promise<AuthOperationResult> {
		try {
			this.state.loading = true;

			await netlifyIdentity.logout();
			this.state.user = null;

			return {
				success: true,
				error: null,
				user: null
			};
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Error al cerrar sesión';
			return {
				success: false,
				error: errorMessage,
				user: this.state.user
			};
		} finally {
			this.state.loading = false;
		}
	}

	async forgotPassword(email: string): Promise<AuthOperationResult> {
		try {
			this.state.loading = true;

			await netlifyIdentity.requestPasswordRecovery(email);

			return {
				success: true,
				error: null
			};
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Error al enviar email de recuperación';
			return {
				success: false,
				error: errorMessage
			};
		} finally {
			this.state.loading = false;
		}
	}

	async resetPassword(token: string, newPassword: string): Promise<AuthOperationResult> {
		try {
			this.state.loading = true;

			const user = await netlifyIdentity.recoverPassword(token, newPassword);
			this.state.user = user;

			return {
				success: true,
				error: null,
				user
			};
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Error al restablecer contraseña';
			return {
				success: false,
				error: errorMessage
			};
		} finally {
			this.state.loading = false;
		}
	}

	async acceptInvite(token: string, password: string): Promise<AuthOperationResult> {
		try {
			this.state.loading = true;

			const user = await netlifyIdentity.acceptInvite(token, password);
			this.state.user = user;

			return {
				success: true,
				error: null,
				user
			};
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Error al aceptar invitación';
			return {
				success: false,
				error: errorMessage
			};
		} finally {
			this.state.loading = false;
		}
	}

	async confirmEmail(token: string): Promise<AuthOperationResult> {
		try {
			this.state.loading = true;

			const user = await netlifyIdentity.confirmEmail(token);
			this.state.user = user;

			return {
				success: true,
				error: null,
				user
			};
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Error al confirmar email';
			return {
				success: false,
				error: errorMessage
			};
		} finally {
			this.state.loading = false;
		}
	}

	async updateUser(updates: {
		email?: string;
		password?: string;
		data?: Record<string, unknown>;
	}): Promise<AuthOperationResult> {
		try {
			this.state.loading = true;

			const user = await netlifyIdentity.updateUser(updates);
			this.state.user = user;

			return {
				success: true,
				error: null,
				user
			};
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Error al actualizar usuario';
			return {
				success: false,
				error: errorMessage
			};
		} finally {
			this.state.loading = false;
		}
	}

	async getSettings(): Promise<netlifyIdentity.Settings | null> {
		try {
			return await netlifyIdentity.getSettings();
		} catch (error) {
			console.error('Error fetching settings:', error);
			return null;
		}
	}

	async refreshSession(): Promise<string | null> {
		try {
			return await netlifyIdentity.refreshSession();
		} catch (error) {
			console.error('Error refreshing session:', error);
			return null;
		}
	}

	async handleAuthCallback(): Promise<CallbackResult | null> {
		try {
			const result = await netlifyIdentity.handleAuthCallback();

			// Si el callback nos da un usuario actualizado, lo sincronizamos
			if (result?.user) {
				this.state.user = result.user;
			}

			return result;
		} catch (error) {
			console.error('Error handling auth callback:', error);
			return null;
		}
	}

	// Limpiar recursos al destruir el store (si es necesario)
	destroy(): void {
		if (this.unsubscribe) {
			this.unsubscribe();
			this.unsubscribe = null;
		}
	}
}

// Exportamos una única instancia del store
export const auth = new AuthStore();

// Helper para usar en layouts o rutas protegidas
export function requireAuth(): boolean {
	if (!auth.isAuthenticated) {
		// Import dinámico para evitar problemas de dependencia circular
		import('$app/navigation').then(({ goto }) => {
			goto('/login');
		});
		return false;
	}
	return true;
}
