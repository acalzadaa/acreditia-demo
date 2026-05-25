import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z.email('Email inválido'),
    password: z.string().min(1, 'La contraseña es requerida')
});

export type LoginForm = z.infer<typeof loginFormSchema>;