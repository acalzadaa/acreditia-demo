type ModalState<TItem = unknown> = {
	activeModal: string | null;
	selectedItem: TItem | null;
};

type ModalId = 'create' | 'edit' | 'delete' | 'restore' | 'default';

export function createModalManager<TItem = unknown>() {
	const state = $state<ModalState<TItem>>({
		activeModal: null,
		selectedItem: null
	});

	function open(modalId: ModalId, item?: TItem) {
		state.activeModal = modalId;
		state.selectedItem = item ?? null;
	}

	function close() {
		state.activeModal = null;
		state.selectedItem = null;
	}

	function isOpen(modalId: ModalId) {
		return state.activeModal === modalId;
	}

	function handlers(modalId: ModalId, item?: TItem) {
		return {
			//sin item para el caso del createForm
			onclick: () => open(modalId, item),
			onkeydown: (e: KeyboardEvent) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					open(modalId, item);
				}
			},
			//con item para el caso de Edit, Delete y Restore
			onClickItem: (item: TItem) => open(modalId, item),
			/**
			 * Use this for keyboard events where you send the item
			 * @param e the keyboard event
			 * @param item the item
			 */
			onKeydownItem: (e: KeyboardEvent, item: TItem) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					open(modalId, item);
				}
			},
			get isOpen() {
				return isOpen(modalId);
			}
		};
	}

	function onSuccess() {
		close();
		// TODO agregar toast o notificacion
	}

	return {
		get activeModal() {
			return state.activeModal;
		},
		get selectedItem() {
			return state.selectedItem;
		},
		open,
		close,
		isOpen,
		handlers,
		onSuccess
	};
}
