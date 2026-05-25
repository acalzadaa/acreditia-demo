import { describe, it, expect } from 'vitest';
import { planeacionEstrategicaFormSchema, planeacionEstrategicaItemSchema, planeacionEstrategicaRefSchema } from '$lib/schemas/planeacionEstrategica.schema';

// ─── filosofiainstitucionalRefSchema ──────────────────────────────────────────────────────────

describe('filosofiainstitucionalRefSchema', () => {
  it('acepta datos válidos', () => {
    const result = planeacionEstrategicaRefSchema.safeParse({
      id: crypto.randomUUID(),
      code: 'P001',
      name: 'Desarrollador'
    });
    expect(result.success).toBe(true);
  });

  it('rechaza id que no es UUID', () => {
    const result = planeacionEstrategicaRefSchema.safeParse({
      id: 'no-es-uuid',
      code: 'P001',
      name: 'Desarrollador'
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]!.path).toContain('id');
  });

  it('rechaza si falta name', () => {
    const result = planeacionEstrategicaRefSchema.safeParse({ id: crypto.randomUUID(), code: 'P001' });
    expect(result.success).toBe(false);
  });
});

// ─── filosofiainstitucionalFormSchema ─────────────────────────────────────────────────────────

describe('filosofiainstitucionalFormSchema', () => {
  const base = { code: 'P001', filosofiaId: crypto.randomUUID(),  name: 'Desarrollador', type: 'funcional' as const };

  describe('code', () => {
    it('acepta código válido', () => {
      expect(planeacionEstrategicaFormSchema.safeParse(base).success).toBe(true);
    });

    it('rechaza code vacío', () => {
      const result = planeacionEstrategicaFormSchema.safeParse({ ...base, code: '' });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]!.path).toContain('code');
    });

    it('rechaza code mayor a 255 caracteres', () => {
      const result = planeacionEstrategicaFormSchema.safeParse({ ...base, code: 'A'.repeat(256) });
      expect(result.success).toBe(false);
    });
  });

  describe('name', () => {
    it('rechaza name vacío', () => {
      const result = planeacionEstrategicaFormSchema.safeParse({ ...base, name: '' });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]!.path).toContain('name');
    });

    it('rechaza name mayor a 255 caracteres', () => {
      const result = planeacionEstrategicaFormSchema.safeParse({ ...base, name: 'A'.repeat(256) });
      expect(result.success).toBe(false);
    });
  });

  describe('description', () => {
    it('usa string vacío como default', () => {
      const result = planeacionEstrategicaFormSchema.safeParse(base);
      expect(result.data?.description).toBe('');
    });
  });

  describe('id', () => {
    it('es opcional', () => {
      expect(planeacionEstrategicaFormSchema.safeParse(base).success).toBe(true);
    });

    it('rechaza id que no es UUID cuando se envía', () => {
      const result = planeacionEstrategicaFormSchema.safeParse({ ...base, id: 'no-uuid' });
      expect(result.success).toBe(false);
    });

    it('acepta UUID válido', () => {
      const result = planeacionEstrategicaFormSchema.safeParse({ ...base, id: crypto.randomUUID() });
      expect(result.success).toBe(true);
    });
  });
});

// ─── filosofiainstitucionalItemSchema ─────────────────────────────────────────────────────────

describe('filosofiainstitucionalItemSchema', () => {
  const base = {
    id: crypto.randomUUID(),
    filosofiaId: crypto.randomUUID(),
    code: 'P001',
    name: 'Desarrollador',
    type: 'funcional' as const,
    createdBy: 'a@a.com'
  };

  it('acepta datos mínimos con defaults', () => {
    const result = planeacionEstrategicaItemSchema.safeParse(base);
    expect(result.success).toBe(true);
    expect(result.data?.version).toBe(0);
    expect(result.data?.isCurrent).toBe(false);
    expect(result.data?.isDeleted).toBe(false);
  });

  it('acepta datos completos', () => {
    const result = planeacionEstrategicaItemSchema.safeParse({
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
    const result = planeacionEstrategicaItemSchema.safeParse({ ...base, id: 'mal-id' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]!.path).toContain('id');
  });
});