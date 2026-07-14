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
import evaluacionEtapaJsonData from '$lib/data/evaluacion-etapa.json';

import campusAreaResponsableJsonData from '$lib/data/campus-area-responsable.json';
import campusUnidadAcademicaJsonData from '$lib/data/campus-unidad-academica.json';

import indicadorJsonData from '$lib/data/indicador.json';
import rubricaJsonData from '$lib/data/rubrica.json';
import rubricaCriterioJsonData from '$lib/data/rubrica-criterio.json';

import indicadorAreaResponsableJsonData from '$lib/data/indicador-area-responsable.json';
import indicadorAreaFuncionalJsonData from '$lib/data/indicador-area-funcional.json';
import indicadorNormativaJsonData from '$lib/data/indicador-normativa.json';
import indicadorIndicadorEstrategicoJsonData from '$lib/data/indicador-indicador-estrategico.json';
import indicadorEvidenciaJsonData from '$lib/data/indicador-evidencia.json';

import indicadorNavigationJsonData from '$lib/data/indicador-navigation.json';
import evaluacionNavigationJsonData from '$lib/data/evaluacion-navigation.json';
import etapaDetailJsonData from '$lib/data/etapa-detail.json';
import evaluacionEtapaIndicadorCampusJsonData from '$lib/data/evaluacion-etapa-indicador-campus.json';

import notificationJsonData from '$lib/data/notification.json';

import {
	filosofiaInstitucionalItemSchema,
	type FilosofiaInstitucionalItem
} from '$lib/schemas/filosofiaInstitucional.schema';
import {
	objetivoEstrategicoItemSchema,
	type ObjetivoEstrategicoItem
} from '$lib/schemas/objetivoEstrategico.schema';
import {
	planeacionEstrategicaItemSchema,
	type PlaneacionEstrategicaItem
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
import { evaluacionItemSchema, type EvaluacionItem } from '$lib/schemas/evaluacion.schema';

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
import { regionCampusItemSchema, type RegionCampusItem } from '$lib/schemas/regionCampus.schema';
import { campusItemSchema, type CampusItem } from '$lib/schemas/campus.schema';
import {
	areaResponsableItemSchema,
	type AreaResponsableItem
} from '$lib/schemas/areaResponsable.schema';
import { indicadorItemSchema, type IndicadorItem } from '$lib/schemas/indicador.schema';
import { rubricaItemSchema, type RubricaItem } from '$lib/schemas/rubrica.schema';
import {
	indicadorAreaResponsableItemSchema,
	type IndicadorAreaResponsableItem
} from '$lib/schemas/indicadorAreaResponsable';
import {
	indicadorAreaFuncionalItemSchema,
	type IndicadorAreaFuncionalItem
} from '$lib/schemas/indicadorAreaFuncional';
import {
	indicadorNormativaItemSchema,
	type IndicadorNormativaItem
} from '$lib/schemas/indicadorNormativa';
import {
	indicadorIndicadorEstrategicoItemSchema,
	type IndicadorIndicadorEstrategicoItem
} from '$lib/schemas/indicadorIndicadorEstrategico';
import {
	indicadorNavListItemSchema,
	type indicadorNavListItem
} from '$lib/schemas/indicadorNavigation.schema';
import {
	rubricaCriterioItemSchema,
	type RubricaCriterioItem
} from '$lib/schemas/rubricaCriterio.schema';
import {
	evaluacionNavItemSchema,
	type EvaluacionNavItem
} from '$lib/schemas/evaluacionNavigation.schema';
import {
	evaluacionEtapaItemSchema,
	type EvaluacionEtapaItem
} from '$lib/schemas/evaluacionEtapa.schema';
import { etapaDetailItemSchema, type EtapaDetailItem } from '$lib/schemas/etapaDetail.schema';
import {
	evaluacionEtapaIndicadorCampusItemSchema,
	type EvaluacionEtapaIndicadorCampusItem
} from '$lib/schemas/evaluacionEtapaIndicadorCampus.schema';
import { notificationItemSchema, type NotificationItem } from '$lib/schemas/notificacion.schema';
import { indicadorEvidenciaItemSchema, type IndicadorEvidenciaItem } from '$lib/schemas/indicadorEvidencia';

// Estado reactivo
let filosofias = $state<FilosofiaInstitucionalItem[]>([]);
let planeaciones = $state<PlaneacionEstrategicaItem[]>([]);
let objetivoEstrategico = $state<ObjetivoEstrategicoItem[]>([]);
let indicadorEstrategico = $state<IndicadorEstrategicoItem[]>([]);

let normativas = $state<NormativaItem[]>([]);

let entidadLegal = $state<EntidadLegalItem[]>([]);
let region = $state<RegionWithRelationsItem[]>([]);
let regionCampus = $state<RegionCampusItem[]>([]);

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

let evaluacion = $state<EvaluacionItem[]>([]);
let evaluacionNavigation = $state<EvaluacionNavItem[]>([]);
let evaluacionEtapa = $state<EvaluacionEtapaItem[]>([]);

let indicador = $state<IndicadorItem[]>([]);
let rubrica = $state<RubricaItem[]>([]);
let rubricaCriterio = $state<RubricaCriterioItem[]>([]);
let indicadorAreaResponsable = $state<IndicadorAreaResponsableItem[]>([]);
let indicadorAreaFuncional = $state<IndicadorAreaFuncionalItem[]>([]);
let indicadorNormativa = $state<IndicadorNormativaItem[]>([]);
let indicadorEvidencia = $state<IndicadorEvidenciaItem[]>([]);
let indicadorIndicadorEstrategico = $state<IndicadorIndicadorEstrategicoItem[]>([]);
let indicadorNavList = $state<indicadorNavListItem[]>([]);
let etapaDetail = $state<EtapaDetailItem[]>([]);
let evaluacionEtapaIndicadorCampus = $state<EvaluacionEtapaIndicadorCampusItem[]>([]);

let notification = $state<NotificationItem[]>([]);

const filosofiaRawData = filosofiaJsonData.filosofiaInstitucionalItem;
filosofias = filosofiaRawData.map((item) => filosofiaInstitucionalItemSchema.parse(item));

const planeacionesRawData = planeacionJsonData.planeacionEstrategicaItem;
planeaciones = planeacionesRawData.map((item) => planeacionEstrategicaItemSchema.parse(item));

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
regionCampus = regionCampusRawData.map((item) => regionCampusItemSchema.parse(item));

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
evaluacion = evaluacionRawData.map((item) => evaluacionItemSchema.parse(item));

const indicadorRawData = indicadorJsonData.indicadorItems;
indicador = indicadorRawData.map((item) => indicadorItemSchema.parse(item));

const rubricaRawData = rubricaJsonData.rubricaItems;
rubrica = rubricaRawData.map((item) => rubricaItemSchema.parse(item));

const rubricaCriterioRawData = rubricaCriterioJsonData.rubricaCriterioItems;
rubricaCriterio = rubricaCriterioRawData.map((item) => rubricaCriterioItemSchema.parse(item));

const evaluacionEtapaRawData = evaluacionEtapaJsonData.evaluacionEtapaItems;
evaluacionEtapa = evaluacionEtapaRawData.map((item) => evaluacionEtapaItemSchema.parse(item));

const evaluacionEtapaIndicadorCampusRawData =
	evaluacionEtapaIndicadorCampusJsonData.evaluacionEtapaIndicadorCampus;
evaluacionEtapaIndicadorCampus = evaluacionEtapaIndicadorCampusRawData.map((item) =>
	evaluacionEtapaIndicadorCampusItemSchema.parse(item)
);

const indicadorAreaResponsableRawData =
	indicadorAreaResponsableJsonData.indicadorAreaResponsableItems;
indicadorAreaResponsable = indicadorAreaResponsableRawData.map((item) =>
	indicadorAreaResponsableItemSchema.parse(item)
);

const indicadorAreaFuncionalRawData = indicadorAreaFuncionalJsonData.indicadorAreaFuncionalItems;
indicadorAreaFuncional = indicadorAreaFuncionalRawData.map((item) =>
	indicadorAreaFuncionalItemSchema.parse(item)
);

const indicadorNormativaRawData = indicadorNormativaJsonData.indicadorNormativaItems;
indicadorNormativa = indicadorNormativaRawData.map((item) =>
	indicadorNormativaItemSchema.parse(item)
);

const indicadorEvidenciaRawData = indicadorEvidenciaJsonData.indicadorEvidenciaItems;
indicadorEvidencia = indicadorEvidenciaRawData.map((item) =>
	indicadorEvidenciaItemSchema.parse(item)
);

const indicadorIndicadorEstrategicoRawData =
	indicadorIndicadorEstrategicoJsonData.indicadorIndicadorEstrategicoItems;
indicadorIndicadorEstrategico = indicadorIndicadorEstrategicoRawData.map((item) =>
	indicadorIndicadorEstrategicoItemSchema.parse(item)
);

const indicadorNavigationRawData = indicadorNavigationJsonData.indicadorNavListItem;
indicadorNavList = indicadorNavigationRawData.map((item) => indicadorNavListItemSchema.parse(item));

const evaluacionNavigationRawData = evaluacionNavigationJsonData.evaluacionNavItem;
evaluacionNavigation = evaluacionNavigationRawData.map((item) =>
	evaluacionNavItemSchema.parse(item)
);

const etapaDetailRawData = etapaDetailJsonData.etapaDetailItem;
etapaDetail = etapaDetailRawData.map((item) => etapaDetailItemSchema.parse(item));

const notificationRawData = notificationJsonData.notificationItems;
notification = notificationRawData.map((item) => notificationItemSchema.parse(item));

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

export function getIndicadorEstrategicoRef() {
	return indicadorEstrategico.map((item) => ({
		id: item.id,
		code: item.code,
		name: item.name
	}));
}

export function getNormativa() {
	return normativas;
}

export function getNormativaRef() {
	return normativas.map((item) => ({
		id: item.id,
		code: item.code,
		name: item.name
	}));
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

export function getUnidadAcademicaRef() {
	return unidadAcademica.map((item) => ({
		id: item.id,
		code: item.code,
		name: item.name
	}));
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

export function getEvaluacionNavigation() {
	return evaluacionNavigation;
}

export function getEvaluacionEtapa() {
	return evaluacionEtapa;
}

export function getIndicador() {
	return indicador;
}

export function getRubrica() {
	return rubrica;
}

export function getRubricaCriterio() {
	return rubricaCriterio;
}

export function getIndicadorAreaResponsable() {
	return indicadorAreaResponsable;
}

export function getIndicadorAreaFuncional() {
	return indicadorAreaFuncional;
}

export function getIndicadorNormativa() {
	return indicadorNormativa;
}

export function getIndicadorIndicadorEstrategico() {
	return indicadorIndicadorEstrategico;
}

export function getIndicadorNavList() {
	return indicadorNavList;
}

export function getEtapaDetail() {
	return etapaDetail;
}

export function getEvaluacionEtapaIndicadorCampus() {
	return evaluacionEtapaIndicadorCampus;
}

export function getNotificacion() {
	return notification;
}

export function getIndicadorEvidencia() {
	return indicadorEvidencia;
}