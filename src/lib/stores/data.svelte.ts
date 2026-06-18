import filosofiaJsonData from '$lib/data/filosofia-institucional.json';
import planeacionJsonData from '$lib/data/planeacion-estrategica.json';
import objetivoEstrategicoJsonData from '$lib/data/objetivo-estrategico.json';
import indicadorEstrategicoJsonData from '$lib/data/indicador-estrategico.json';

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
import modeloFullRefJsonData from '$lib/data/modelo-full-ref.json';

import evidenciaJsonData from '$lib/data/evidencia.json';
import evaluacionJsonData from '$lib/data/evaluacion.json';
import etapaJsonData from '$lib/data/etapa.json';

import campusAreaResponsableJsonData from '$lib/data/campus-area-responsable.json';
import campusUnidadAcademicaJsonData from '$lib/data/campus-unidad-academica.json';

import indicadorJsonData from '$lib/data/indicador.json';
import rubricaJsonData from '$lib/data/rubrica.json';

import {
	filosofiaInstitucionalItemSchema,
	type FilosofiaInstitucionalItem
} from '$lib/schemas/filosofiaInstitucional.schema';
import {
	objetivoEstrategicoItemSchema,
	type ObjetivoEstrategicoItem
} from '$lib/schemas/objetivoEstrategico.schema';
import {
	planeacionEstrategicaWithFilosofiaItemSchema,
	type PlaneacionEstrategicaWithFilosofiaItem
} from '$lib/schemas/planeacionEstrategica.schema';
import {
	indicadorEstrategicoItemSchema,
	type IndicadorEstrategicoItem
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

import {
	type ModeloFullRef,
	modeloFullRefSchema,
	type ModeloItem,
	modeloItemSchema
} from '$lib/schemas/modelo.schema';
import { capituloItemSchema, type CapituloItem } from '$lib/schemas/capitulo.schema';
import { seccionItemSchema, type SeccionItem } from '$lib/schemas/seccion.schema';
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
	type CampusUnidadAcademicaItem,
	campusUnidadAcademicaItemSchema
} from '$lib/schemas/campusUnidadAcademica.schema';
import {
	campusAreaResponsableItemSchema,
	type CampusAreaResponsableItem
} from '$lib/schemas/campusAreaResponsable.schema';
import {
	regionCampusWithRelationsItemSchema,
	type RegionCampusWithRelationsItem
} from '$lib/schemas/regionCampus.schema';
import { campusItemSchema, type CampusItem } from '$lib/schemas/campus.schema';
import {
	areaResponsableItemSchema,
	type AreaResponsableItem
} from '$lib/schemas/areaResponsable.schema';
import { indicadorItemSchema, type IndicadorItem } from '$lib/schemas/indicador.schema';
import { rubricaItemSchema, type RubricaItem } from '$lib/schemas/rubrica.schema';

// Estado reactivo
let filosofias = $state<FilosofiaInstitucionalItem[]>([]);
let planeaciones = $state<PlaneacionEstrategicaWithFilosofiaItem[]>([]);
let objetivoEstrategico = $state<ObjetivoEstrategicoItem[]>([]);
let indicadorEstrategico = $state<IndicadorEstrategicoItem[]>([]);

let normativas = $state<NormativaItem[]>([]);

let entidadLegal = $state<EntidadLegalItem[]>([]);
let region = $state<RegionWithRelationsItem[]>([]);
let regionCampus = $state<RegionCampusWithRelationsItem[]>([]);

let institucion = $state<InstitucionWithRelationsItem[]>([]);

let campus = $state<CampusItem[]>([]);
let campusUnidadAcademica = $state<CampusUnidadAcademicaItem[]>([]);
let campusAreaResponsable = $state<CampusAreaResponsableItem[]>([]);

let unidadAcademica = $state<UnidadAcademicaItem[]>([]);

let puesto = $state<PuestoItem[]>([]);

let areaResponsable = $state<AreaResponsableItem[]>([]);
let areaFuncional = $state<AreaFuncionalWithRelationsItem[]>([]);

let modelo = $state<ModeloItem[]>([]);
let capitulo = $state<CapituloItem[]>([]);
let seccion = $state<SeccionItem[]>([]);
let modeloFullRef = $state<ModeloFullRef[]>([]);

let evidencia = $state<EvidenciaItem[]>([]);

let evaluacion = $state<EvaluacionWithRelationsItem[]>([]);
let etapa = $state<EtapaWithRelationsItem[]>([]);

let indicador = $state<IndicadorItem[]>([]);
let rubrica = $state<RubricaItem[]>([]);

const filosofiaRawData = filosofiaJsonData.filosofiaInstitucionalItem;
filosofias = filosofiaRawData.map((item) => filosofiaInstitucionalItemSchema.parse(item));

const planeacionesRawData = planeacionJsonData['planeacion-estrategica'];
planeaciones = planeacionesRawData.map((item) =>
	planeacionEstrategicaWithFilosofiaItemSchema.parse(item)
);

const objetivoEstrategicoRawData = objetivoEstrategicoJsonData.objetivoEstrategicosItem;
objetivoEstrategico = objetivoEstrategicoRawData.map((item) =>
	objetivoEstrategicoItemSchema.parse(item)
);

const indicadorEstrategicoRawData = indicadorEstrategicoJsonData.indicadorEstrategicoItem;
indicadorEstrategico = indicadorEstrategicoRawData.map((item) =>
	indicadorEstrategicoItemSchema.parse(item)
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
	campusAreaResponsableItemSchema.parse(item)
);

const campusUnidadAcademicaRawData = campusUnidadAcademicaJsonData.campusUnidadAcademicaItems;
campusUnidadAcademica = campusUnidadAcademicaRawData.map((item) =>
	campusUnidadAcademicaItemSchema.parse(item)
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
areaResponsable = areaResponsableRawData.map((item) => areaResponsableItemSchema.parse(item));

const modeloRawData = modeloJsonData.modeloItems;
modelo = modeloRawData.map((item) => modeloItemSchema.parse(item));

const modeloFullRefRawData = modeloFullRefJsonData.modeloFullRefItems;
modeloFullRef = modeloFullRefRawData.map((item) => modeloFullRefSchema.parse(item));

const capituloRawData = capituloJsonData.capituloItems;
capitulo = capituloRawData.map((item) => capituloItemSchema.parse(item));

const seccionRawData = seccionJsonData.seccionItems;
seccion = seccionRawData.map((item) => seccionItemSchema.parse(item));

const evidenciaRawData = evidenciaJsonData.evidenciaItems;
evidencia = evidenciaRawData.map((item) => evidenciaItemSchema.parse(item));

const evaluacionRawData = evaluacionJsonData.evaluacionItems;
evaluacion = evaluacionRawData.map((item) => evaluacionWithRelationsItemSchema.parse(item));

const indicadorRawData = indicadorJsonData.indicadorItems;
indicador = indicadorRawData.map((item) => indicadorItemSchema.parse(item));

const rubricaRawData = rubricaJsonData.rubricaItems;
rubrica = rubricaRawData.map((item) => rubricaItemSchema.parse(item));

const etapaRawData = etapaJsonData.etapaItems;
etapa = etapaRawData.map((item) => etapaWithRelationsItemSchema.parse(item));

// Helpers
export function getFilosofia() {
	return filosofias;
}

export function getPlaneacion() {
	return planeaciones;
}

export function getObjetivoEstrategico() {
	return objetivoEstrategico;
}

export function getIndicadorEstrategico() {
	return indicadorEstrategico;
}

export function getNormativa() {
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

export function getModeloFullRef() {
	return modeloFullRef;
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

export function getIndicador() {
	return indicador;
}

export function getRubrica() {
	return rubrica;
}
