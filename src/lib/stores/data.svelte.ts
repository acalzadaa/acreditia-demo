// src/lib/stores/data.svelte.ts
import jsonData from '$lib/data/filosofia-institucional.json';
import {
	filosofiaInstitucionalItemSchema,
	type FilosofiaInstitucionalItem
} from '$lib/schemas/filosofiaInstitucional.schema';

// Estado reactivo
let filosofias = $state<FilosofiaInstitucionalItem[]>([]);

const rawData = jsonData['filosofia-institucional'];
filosofias = rawData.map((item) => filosofiaInstitucionalItemSchema.parse(item));

// Helpers
export function getFilosofiaByCode(code: string) {
	return filosofias.find((item) => item.code === code);
}

export function getFilosofias() {
	return filosofias;
}
