import { describe, it, expect } from 'vitest';
import { puestoFormSchema, puestoItemSchema, puestoRefSchema } from '$lib/schemas/puesto.schema';

// ─── puestoRefSchema ──────────────────────────────────────────────────────────

describe('puestoRefSchema', () => {
  it('acepta datos válidos', () => {
    const result = puestoRefSchema.safeParse({
      id: crypto.randomUUID(),
      code: 'P001',
      name: 'Desarrollador'
    });
    expect(result.success).toBe(true);
  });

  it('rechaza id que no es UUID', () => {
    const result = puestoRefSchema.safeParse({
      id: 'no-es-uuid',
      code: 'P001',
      name: 'Desarrollador'
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]!.path).toContain('id');
  });

  it('rechaza si falta name', () => {
    const result = puestoRefSchema.safeParse({ id: crypto.randomUUID(), code: 'P001' });
    expect(result.success).toBe(false);
  });
});

// ─── puestoFormSchema ─────────────────────────────────────────────────────────

describe('puestoFormSchema', () => {
  const base = { code: 'P001', name: 'Desarrollador', type: 'funcional' as const };

  describe('code', () => {
    it('acepta código válido', () => {
      expect(puestoFormSchema.safeParse(base).success).toBe(true);
    });

    it('rechaza code vacío', () => {
      const result = puestoFormSchema.safeParse({ ...base, code: '' });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]!.path).toContain('code');
    });

    it('rechaza code mayor a 50 caracteres', () => {
      const result = puestoFormSchema.safeParse({ ...base, code: 'A'.repeat(51) });
      expect(result.success).toBe(false);
    });
  });

  describe('name', () => {
    it('rechaza name vacío', () => {
      const result = puestoFormSchema.safeParse({ ...base, name: '' });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]!.path).toContain('name');
    });

    it('rechaza name mayor a 255 caracteres', () => {
      const result = puestoFormSchema.safeParse({ ...base, name: 'A'.repeat(256) });
      expect(result.success).toBe(false);
    });
  });

  describe('type', () => {
    it('acepta funcional', () => {
      expect(puestoFormSchema.safeParse({ ...base, type: 'funcional' }).success).toBe(true);
    });

    it('acepta responsable', () => {
      expect(puestoFormSchema.safeParse({ ...base, type: 'responsable' }).success).toBe(true);
    });

    it('usa funcional como default si no se envía', () => {
      const result = puestoFormSchema.safeParse({ code: 'P001', name: 'Dev' });
      expect(result.success).toBe(true);
      expect(result.data?.type).toBe('funcional');
    });

    it('rechaza tipo inválido', () => {
      const result = puestoFormSchema.safeParse({ ...base, type: 'gerente' });
      expect(result.success).toBe(false);
    });
  });

  describe('description', () => {
    it('usa string vacío como default', () => {
      const result = puestoFormSchema.safeParse(base);
      expect(result.data?.description).toBe('');
    });
  });

  describe('id', () => {
    it('es opcional', () => {
      expect(puestoFormSchema.safeParse(base).success).toBe(true);
    });

    it('rechaza id que no es UUID cuando se envía', () => {
      const result = puestoFormSchema.safeParse({ ...base, id: 'no-uuid' });
      expect(result.success).toBe(false);
    });

    it('acepta UUID válido', () => {
      const result = puestoFormSchema.safeParse({ ...base, id: crypto.randomUUID() });
      expect(result.success).toBe(true);
    });
  });
});

// ─── puestoItemSchema ─────────────────────────────────────────────────────────

describe('puestoItemSchema', () => {
  const base = {
    id: crypto.randomUUID(),
    code: 'P001',
    name: 'Desarrollador',
    type: 'funcional' as const,
  };

  it('acepta datos mínimos con defaults', () => {
    const result = puestoItemSchema.safeParse(base);
    expect(result.success).toBe(true);
    expect(result.data?.version).toBe(0);
    expect(result.data?.isCurrent).toBe(false);
    expect(result.data?.isDeleted).toBe(false);
  });

  it('acepta datos completos', () => {
    const result = puestoItemSchema.safeParse({
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
    const result = puestoItemSchema.safeParse({ ...base, id: 'mal-id' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]!.path).toContain('id');
  });
});