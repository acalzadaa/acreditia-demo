export type ToastVariant = 'success' | 'critical' | 'info' | 'warning';

export type ToastItem = {
	id: string;
	variant: ToastVariant;
	label: string;
};

function createToastManager() {
	const toasts = $state<ToastItem[]>([]);

	function show(variant: ToastVariant, label: string, duration = 4000) {
		const id = crypto.randomUUID();
		toasts.push({ id, variant, label });

		if (duration > 0) {
			setTimeout(() => dismiss(id), duration);
		}

		return id;
	}

	function dismiss(id: string) {
		const index = toasts.findIndex((t) => t.id === id);
		if (index !== -1) toasts.splice(index, 1);
	}

	return {
		get items() {
			return toasts;
		},
		dismiss,
		success: (label: string, duration?: number) => show('success', label, duration),
		critical: (label: string, duration?: number) => show('critical', label, duration ?? 0), // errores no se auto-cierran
		warning: (label: string, duration?: number) => show('warning', label, duration),
		info: (label: string, duration?: number) => show('info', label, duration)
	};
}

// Singleton: UNA instancia compartida por toda la app
export const toast = createToastManager();