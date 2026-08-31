import type { OptionData } from "$lib/components/ui/select/utils/inputSelect";
import { capitalizeText } from "./stringUtils";

export const createOptions = <T extends string>(values: T[]): OptionData[] =>
	values?.map((v) => ({
		id: v,
		option: capitalizeText(v)
	})) ?? [];
