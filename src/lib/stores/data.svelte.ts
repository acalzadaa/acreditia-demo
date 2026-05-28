import filosofiaJsonData from '$lib/data/filosofia-institucional.json';
import planeacionJsonData from '$lib/data/planeacion-estrategica.json';
import objetivoJsonData from '$lib/data/objetivo-estrategico.json';
import indicadorJsonData from '$lib/data/indicador-estrategico.json';
import normativaJsonData from '$lib/data/normativa.json';
import entidadLegalJsonData from '$lib/data/entidad-legal.json';

import regionJsonData from '$lib/data/region.json';

import {
	filosofiaInstitucionalItemSchema,
	type FilosofiaInstitucionalItem
} from '$lib/schemas/filosofiaInstitucional.schema';
import {
	objetivoEstrategicoWithPlaneacionItemSchema,
	type ObjetivoEstrategicoWithPlaneacionItem
} from '$lib/schemas/objetivoEstrategico.schema';
import {
	planeacionEstrategicaWithFilosofiaItemSchema,
	type PlaneacionEstrategicaWithFilosofiaItem
} from '$lib/schemas/planeacionEstrategica.schema';
import {
	indicadorEstrategicoWithObjetivoItemSchema,
	type IndicadorEstrategicoWithObjetivoItem
} from '$lib/schemas/indicadorEstrategico.schema';
import { normativaItemSchema, type NormativaItem } from '$lib/schemas/normativa.schema';
import { entidadLegalItemSchema, type EntidadLegalItem } from '$lib/schemas/entidadLegal.schema';
import {  regionWithEntidadLegalItemSchema, type RegionWithEntidadLegalItem } from '$lib/schemas/region.schema';

// Estado reactivo
let filosofias = $state<FilosofiaInstitucionalItem[]>([]);
let planeaciones = $state<PlaneacionEstrategicaWithFilosofiaItem[]>([]);
let objetivos = $state<ObjetivoEstrategicoWithPlaneacionItem[]>([]);
let indicadores = $state<IndicadorEstrategicoWithObjetivoItem[]>([]);
let normativas = $state<NormativaItem[]>([]);
let entidadLegal = $state<EntidadLegalItem[]>([]);
let region = $state<RegionWithEntidadLegalItem[]>([]);

const filosofiaRawData = filosofiaJsonData['filosofia-institucional'];
filosofias = filosofiaRawData.map((item) => filosofiaInstitucionalItemSchema.parse(item));

const planeacionesRawData = planeacionJsonData['planeacion-estrategica'];
planeaciones = planeacionesRawData.map((item) =>
	planeacionEstrategicaWithFilosofiaItemSchema.parse(item)
);

const objetivosRawData = objetivoJsonData['objetivos-estrategicos'];
objetivos = objetivosRawData.map((item) => objetivoEstrategicoWithPlaneacionItemSchema.parse(item));

const indicadoresRawData = indicadorJsonData['indicadores-estrategicos'];
indicadores = indicadoresRawData.map((item) =>
	indicadorEstrategicoWithObjetivoItemSchema.parse(item)
);

const normativasRawData = normativaJsonData['normativas'];
normativas = normativasRawData.map((item) => normativaItemSchema.parse(item));

const entidadLegalRawData = entidadLegalJsonData.entidadLegalItems;
entidadLegal = entidadLegalRawData.map((item) => entidadLegalItemSchema.parse(item));

const regionRawData = regionJsonData.regionItems;
region = regionRawData.map((item) => regionWithEntidadLegalItemSchema.parse(item));

// Helpers
export function getFilosofias() {
	return filosofias;
}

export function getPlaneaciones() {
	return planeaciones;
}

export function getObjetivos() {
	return objetivos;
}

export function getIndicadores() {
	return indicadores;
}

export function getNormativas() {
	return normativas;
}

export function getEntidadLegal() {
	return entidadLegal;
}

export function getEntidadLegalRef() {
	return entidadLegal.map((item) => ({
		id: item.id,
		code: item.code,
		name: item.name
	}));
}

export function getRegion() {
	return region;
}

export function getRegionRef() {
	return region.map((item) => ({
		id: item.id,
		code: item.code,
		name: item.name
	}));
}
