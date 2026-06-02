import { regionWithDirectorSchema, type RegionWithDirectorItem } from '$lib/schemas/region.schema';
import type { CampusWithRelationsItem } from '$lib/schemas/campus.schema';
import type { RegionCampusWithRelationItem } from '$lib/schemas/regionCampus.schema';

export function extractRegionFromRelation(
  relation: RegionCampusWithRelationItem[]
): RegionWithDirectorItem[] {
  return relation.map((item) => regionWithDirectorSchema.parse(item));
}

export function extractCampusesFromRelations(
  relations: RegionCampusWithRelationItem[]
): CampusWithRelationsItem[] {
  return relations.map(relation => relation.campus);
}