import type { OptionData } from "$lib/components/ui/input/InputSelect.svelte";
import { JOB_TYPE } from "$lib/schemas/puesto.schema";

export type Estatus =
  'activo' | 'inactivo'

export const ESTATUS = ['activo', 'inactivo'] as const;

export const estatusOptions: OptionData[] =
  ESTATUS.map((v) => ({
    id: v,
    option: v.toUpperCase()
  })) ?? [];

export const FREQUENCY_UNIT = ['dia', 'semana', 'mes', 'año'] as const;

export const frequencyUnitOptions: OptionData[] =
  FREQUENCY_UNIT.map((v) => ({
    id: v,
    option: v.toUpperCase()
  })) ?? [];

export const jobTypeOptions: OptionData[] =
  JOB_TYPE.map((v) => ({
    id: v,
    option: v.toUpperCase()
  })) ?? [];  