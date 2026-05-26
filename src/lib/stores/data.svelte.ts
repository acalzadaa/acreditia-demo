import filosofiaJsonData from '$lib/data/filosofia-institucional.json';
import planeacionJsonData from '$lib/data/planeacion-estrategica.json';
import objetivoJsonData from '$lib/data/objetivo-estrategico.json';
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

// Estado reactivo
let filosofias = $state<FilosofiaInstitucionalItem[]>([]);
let planeaciones = $state<PlaneacionEstrategicaWithFilosofiaItem[]>([]);
let objetivos = $state<ObjetivoEstrategicoWithPlaneacionItem[]>([]);

const filosofiaRawData = filosofiaJsonData['filosofia-institucional'];
filosofias = filosofiaRawData.map((item) => filosofiaInstitucionalItemSchema.parse(item));

const planeacionesRawData = planeacionJsonData['planeacion-estrategica'];
planeaciones = planeacionesRawData.map((item) =>
	planeacionEstrategicaWithFilosofiaItemSchema.parse(item)
);

const objetivosRawData = objetivoJsonData['objetivos-estrategicos'];
objetivos = objetivosRawData.map((item) => objetivoEstrategicoWithPlaneacionItemSchema.parse(item));

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
