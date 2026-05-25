import { describe, it, expect } from 'vitest';
import { filosofiaInstitucionalFormSchema, filosofiaInstitucionalItemSchema, filosofiaInstitucionalRefSchema } from '$lib/schemas/filosofiaInstitucional.schema';

// ─── filosofiainstitucionalRefSchema ──────────────────────────────────────────────────────────

describe('filosofiainstitucionalRefSchema', () => {
  it('acepta datos válidos', () => {
    const result = filosofiaInstitucionalRefSchema.safeParse({
      id: crypto.randomUUID(),
      code: 'P001',
      name: 'Desarrollador'
    });
    expect(result.success).toBe(true);
  });

  it('rechaza id que no es UUID', () => {
    const result = filosofiaInstitucionalRefSchema.safeParse({
      id: 'no-es-uuid',
      code: 'P001',
      name: 'Desarrollador'
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]!.path).toContain('id');
  });

  it('rechaza si falta name', () => {
    const result = filosofiaInstitucionalRefSchema.safeParse({ id: crypto.randomUUID(), code: 'P001' });
    expect(result.success).toBe(false);
  });
});

// ─── filosofiainstitucionalFormSchema ─────────────────────────────────────────────────────────

describe('filosofiainstitucionalFormSchema', () => {
  const base = { code: 'P001', name: 'Desarrollador' };

  describe('code', () => {
    it('acepta código válido', () => {
      expect(filosofiaInstitucionalFormSchema.safeParse(base).success).toBe(true);
    });

    it('rechaza code vacío', () => {
      const result = filosofiaInstitucionalFormSchema.safeParse({ ...base, code: '' });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]!.path).toContain('code');
    });

    it('rechaza code mayor a 50 caracteres', () => {
      const result = filosofiaInstitucionalFormSchema.safeParse({ ...base, code: 'A'.repeat(51) });
      expect(result.success).toBe(false);
    });
  });

  describe('name', () => {
    it('rechaza name vacío', () => {
      const result = filosofiaInstitucionalFormSchema.safeParse({ ...base, name: '' });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]!.path).toContain('name');
    });

    it('rechaza name mayor a 255 caracteres', () => {
      const result = filosofiaInstitucionalFormSchema.safeParse({ ...base, name: 'A'.repeat(256) });
      expect(result.success).toBe(false);
    });
  });

  describe('description', () => {
    it('usa string vacío como default', () => {
      const result = filosofiaInstitucionalFormSchema.safeParse(base);
      expect(result.data?.description).toBe('');
    });
  });

  describe('id', () => {
    it('es opcional', () => {
      expect(filosofiaInstitucionalFormSchema.safeParse(base).success).toBe(true);
    });

    it('rechaza id que no es UUID cuando se envía', () => {
      const result = filosofiaInstitucionalFormSchema.safeParse({ ...base, id: 'no-uuid' });
      expect(result.success).toBe(false);
    });

    it('acepta UUID válido', () => {
      const result = filosofiaInstitucionalFormSchema.safeParse({ ...base, id: crypto.randomUUID() });
      expect(result.success).toBe(true);
    });
  });
});

// ─── filosofiainstitucionalItemSchema ─────────────────────────────────────────────────────────

describe('filosofiainstitucionalItemSchema', () => {
  const base = {
    id: crypto.randomUUID(),
    code: 'P001',
    name: 'Desarrollador',
    createdBy: 'a@a.com'
  };

  it('acepta datos mínimos con defaults', () => {
    const result = filosofiaInstitucionalItemSchema.safeParse(base);
    expect(result.success).toBe(true);
    expect(result.data?.version).toBe(0);
    expect(result.data?.isCurrent).toBe(false);
    expect(result.data?.isDeleted).toBe(false);
  });

  it('acepta datos completos', () => {
    const result = filosofiaInstitucionalItemSchema.safeParse({
      ...base,
      version: 3,
      isCurrent: true,
      validFrom: new Date(),
      validTo: new Date(),
      isDeleted: false,
      createdAt: new Date().toISOString(),
    });
    expect(result.success).toBe(true);
  });

  it('rechaza id que no es UUID', () => {
    const result = filosofiaInstitucionalItemSchema.safeParse({ ...base, id: 'mal-id' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]!.path).toContain('id');
  });
});
