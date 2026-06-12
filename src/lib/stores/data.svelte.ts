import filosofiaJsonData from '$lib/data/filosofia-institucional.json';
import planeacionJsonData from '$lib/data/planeacion-estrategica.json';
import objetivoJsonData from '$lib/data/objetivo-estrategico.json';
import indicadorJsonData from '$lib/data/indicador-estrategico.json';

import normativaJsonData from '$lib/data/normativa.json';

import entidadLegalJsonData from '$lib/data/entidad-legal.json';
import regionJsonData from '$lib/data/region.json';
import regionCampusJsonData from '$lib/data/region-campus.json';

import institucionJsonData from '$lib/data/institucion.json';
import campusJsonData from '$lib/data/campus.json';
import unidadAcademicaJsonData from '$lib/data/unidad-academica.json';

import puestoJsonData from '$lib/data/puesto.json';

import areaFuncionalJsonData from '$lib/data/area-funcional.json';
import areaResponsableJsonData from '$lib/data/area-responsable.json';

import modeloJsonData from '$lib/data/modelo.json';
import capituloJsonData from '$lib/data/capitulo.json';
import seccionJsonData from '$lib/data/seccion.json';

import evidenciaJsonData from '$lib/data/evidencia.json';
import evaluacionJsonData from '$lib/data/evaluacion.json';
import etapaJsonData from '$lib/data/etapa.json';

import campusAreaResponsableJsonData from '$lib/data/campus-area-responsable.json';
import campusUnidadAcademicaJsonData from '$lib/data/campus-unidad-academica.json';

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
import {
	institucionWithRelationsItemSchema,
	type InstitucionWithRelationsItem
} from '$lib/schemas/institucion.schema';


import { puestoItemSchema, type PuestoItem } from '$lib/schemas/puesto.schema';
import {
	unidadAcademicaItemSchema,
	type UnidadAcademicaItem
} from '$lib/schemas/unidadAcademica.schema';
import {
	areaFuncionalWithRelationsItemSchema,
	type AreaFuncionalWithRelationsItem
} from '$lib/schemas/areaFuncional.schema';

import { type ModeloItem, modeloItemSchema } from '$lib/schemas/modelo.schema';
import {
	capituloWithModeloItemSchema,
	type CapituloWithModeloItem
} from '$lib/schemas/capitulo.schema';
import {
	seccionWithCapituloItemSchema,
	type SeccionWithCapituloItem
} from '$lib/schemas/seccion.schema';
import { type EvidenciaItem, evidenciaItemSchema } from '$lib/schemas/evidencia.schema';
import {
	evaluacionWithRelationsItemSchema,
	type EvaluacionWithRelationsItem
} from '$lib/schemas/evaluacion.schema';
import {
	etapaWithRelationsItemSchema,
	type EtapaWithRelationsItem
} from '$lib/schemas/etapa.schema';
import {
	regionWithRelationsItemSchema,
	type RegionWithRelationsItem
} from '$lib/schemas/region.schema';
import {
	type CampusUnidadAcademicaWithRelationsItem,
	campusUnidadAcademicaWithRelationsItemSchema
} from '$lib/schemas/campusUnidadAcademica.schema';
import {
	campusAreaResponsableWithRelationsItemSchema,
	type CampusAreaResponsableWithRelationsItem
} from '$lib/schemas/campusAreaResponsable.schema';
import {
	regionCampusWithRelationsItemSchema,
	type RegionCampusWithRelationsItem
} from '$lib/schemas/regionCampus.schema';
import { campusItemSchema, type CampusItem } from '$lib/schemas/campus.schema';
import { areaResponsableWithRelationsItemSchema, type AreaResponsableWithRelationsItem } from '$lib/schemas/areaResponsable.schema';


// Estado reactivo
let filosofias = $state<FilosofiaInstitucionalItem[]>([]);
let planeaciones = $state<PlaneacionEstrategicaWithFilosofiaItem[]>([]);
let objetivos = $state<ObjetivoEstrategicoWithPlaneacionItem[]>([]);
let indicadores = $state<IndicadorEstrategicoWithObjetivoItem[]>([]);

let normativas = $state<NormativaItem[]>([]);

let entidadLegal = $state<EntidadLegalItem[]>([]);
let region = $state<RegionWithRelationsItem[]>([]);
let regionCampus = $state<RegionCampusWithRelationsItem[]>([]);

let institucion = $state<InstitucionWithRelationsItem[]>([]);

let campus = $state<CampusItem[]>([]);
let campusUnidadAcademica = $state<CampusUnidadAcademicaWithRelationsItem[]>([]);
let campusAreaResponsable = $state<CampusAreaResponsableWithRelationsItem[]>([]);

let unidadAcademica = $state<UnidadAcademicaItem[]>([]);

let puesto = $state<PuestoItem[]>([]);

let areaResponsable = $state<AreaResponsableWithRelationsItem[]>([]);
let areaFuncional = $state<AreaFuncionalWithRelationsItem[]>([]);

let modelo = $state<ModeloItem[]>([]);
let capitulo = $state<CapituloWithModeloItem[]>([]);
let seccion = $state<SeccionWithCapituloItem[]>([]);

let evidencia = $state<EvidenciaItem[]>([]);

let evaluacion = $state<EvaluacionWithRelationsItem[]>([]);
let etapa = $state<EtapaWithRelationsItem[]>([]);

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
region = regionRawData.map((item) => regionWithRelationsItemSchema.parse(item));

const regionCampusRawData = regionCampusJsonData.regionCampusItems;
regionCampus = regionCampusRawData.map((item) => regionCampusWithRelationsItemSchema.parse(item));

const institucionRawData = institucionJsonData.institucionItems;
institucion = institucionRawData.map((item) => institucionWithRelationsItemSchema.parse(item));

const campusRawData = campusJsonData.campusItems;
campus = campusRawData.map((item) => campusItemSchema.parse(item));

const campusAreaResponsableRawData = campusAreaResponsableJsonData.campusAreaResponsableItems;
campusAreaResponsable = campusAreaResponsableRawData.map((item) =>
	campusAreaResponsableWithRelationsItemSchema.parse(item)
);

const campusUnidadAcademicaRawData = campusUnidadAcademicaJsonData.campusUnidadAcademicaItems;
campusUnidadAcademica = campusUnidadAcademicaRawData.map((item) =>
	campusUnidadAcademicaWithRelationsItemSchema.parse(item)
);

const unidadAcademicaRawData = unidadAcademicaJsonData.unidadAcademicaItems;
unidadAcademica = unidadAcademicaRawData.map((item) => unidadAcademicaItemSchema.parse(item));

const puestoRawData = puestoJsonData.puestos;
puesto = puestoRawData.map((item) => puestoItemSchema.parse(item));

const areaFuncionalRawData = areaFuncionalJsonData.areaFuncionalItems;
areaFuncional = areaFuncionalRawData.map((item) =>
	areaFuncionalWithRelationsItemSchema.parse(item)
);

const areaResponsableRawData = areaResponsableJsonData.areaResponsableItems;
areaResponsable = areaResponsableRawData.map((item) =>
	areaResponsableWithRelationsItemSchema.parse(item)
);

const modeloRawData = modeloJsonData.modeloItems;
modelo = modeloRawData.map((item) => modeloItemSchema.parse(item));

const capituloRawData = capituloJsonData.capituloItems;
capitulo = capituloRawData.map((item) => capituloWithModeloItemSchema.parse(item));

const seccionRawData = seccionJsonData.seccionItems;
seccion = seccionRawData.map((item) => seccionWithCapituloItemSchema.parse(item));

const evidenciaRawData = evidenciaJsonData.evidenciaItems;
evidencia = evidenciaRawData.map((item) => evidenciaItemSchema.parse(item));

const evaluacionRawData = evaluacionJsonData.evaluacionItems;
evaluacion = evaluacionRawData.map((item) => evaluacionWithRelationsItemSchema.parse(item));

const etapaRawData = etapaJsonData.etapaItems;
etapa = etapaRawData.map((item) => etapaWithRelationsItemSchema.parse(item));

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

export function getRegionCampus() {
	return regionCampus;
}

export function getInstitucion() {
	return institucion;
}

export function getInstitucionRef() {
	return institucion.map((item) => ({
		id: item.id,
		code: item.code,
		name: item.name
	}));
}

export function getCampus() {
	return campus;
}

export function getCampusRef() {
	return campus.map((item) => ({
		id: item.id,
		code: item.code,
		name: item.name
	}));
}

export function getCampusUnidadAcademica() {
	return campusUnidadAcademica;
}

export function getCampusAreaResponsable() {
	return campusAreaResponsable;
}

export function getUnidadAcademica() {
	return unidadAcademica;
}

export function getPuesto() {
	return puesto;
}

export function getPuestoRef(jobType: string) {
	return puesto
		.filter((item) => item.type === jobType)
		.map((item) => ({
			id: item.id,
			code: item.code,
			name: item.name
		}));
}

export function getAreaFuncional() {
	return areaFuncional;
}

export function getAreaFuncionalRef() {
	return areaFuncional.map((item) => ({
		id: item.id,
		code: item.code,
		name: item.name
	}));
}

export function getAreaResponsable() {
	return areaResponsable;
}
export function getAreaResponsableRef() {
	return areaResponsable.map((item) => ({
		id: item.id,
		code: item.code,
		name: item.name
	}));
}

export function getModelo() {
	return modelo;
}

export function getModeloRef() {
	return modelo.map((item) => ({
		id: item.id,
		code: item.code,
		name: item.name
	}));
}

export function getCapitulo() {
	return capitulo;
}

export function getCapituloRef() {
	return capitulo.map((item) => ({
		id: item.id,
		code: item.code,
		name: item.name
	}));
}

export function getSeccion() {
	return seccion;
}

export function getEvidenciaRef() {
	return evidencia.map((item) => ({
		id: item.id,
		code: item.code,
		name: item.name
	}));
}

export function getEvidencia() {
	return evidencia;
}

export function getEvaluacionRef() {
	return evaluacion.map((item) => ({
		id: item.id,
		code: item.code,
		name: item.name
	}));
}

export function getEvaluacion() {
	return evaluacion;
}

export function getEtapa() {
	return etapa;
}
