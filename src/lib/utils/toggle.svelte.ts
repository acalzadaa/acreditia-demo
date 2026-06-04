export function createToggle(initialValue: boolean = false) {
	let value: boolean = $state(initialValue);

	function toggle() {
		value = !value;
	}

	return {
		get value() {
			return value;
		},
		toggle,
		onclick: () => toggle(),
		onkeydown: (e: KeyboardEvent) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				toggle();
			}
		}
	};
}
