import type { OptionData } from "$lib/components/ui/input/InputSelect.svelte";
import { capitalizeText } from "./stringUtils";

export const createOptions = <T extends string>(values: T[]): OptionData[] =>
	values?.map((v) => ({
		id: v,
		option: capitalizeText(v)
	})) ?? [];
