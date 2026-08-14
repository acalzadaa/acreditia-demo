import type { RubricaItem } from "$lib/schemas/rubrica.schema";

export function formatRubricaRange(item: RubricaItem) {
	return `[${item.rangeStart}-${item.rangeEnd}]`;
}

export function isRubricaRange(item: RubricaItem, score: number) {
	return item.rangeStart <= score && item.rangeEnd >= score;
}
