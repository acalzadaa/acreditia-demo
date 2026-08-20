interface CapitalizeOptions {
	allWords?: boolean;
	keepCaps?: boolean;
}

export function capitalizeText(text?: string, options: CapitalizeOptions = {}) {
	const { allWords = false, keepCaps = false } = options;
	if (!text) return '';

	if (allWords) {
		return text
			.split(' ')
			.map((word) => {
				if (keepCaps && word === word.toUpperCase()) {
					return word;
				}
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
			})
			.join(' ');
	}

	return text.charAt(0).toUpperCase() + text.slice(1);
}
