import { z } from 'zod'

export const GENRES = ['FPS', 'RPG'] as const

export const createUserSchema = z.object({
  email: z
    .string({
      required_error: 'Prencha o email, por favor.',
    })
    .min(5, {
      message: 'Email deve conter mais de 5 caracteres.',
    })
    .email({
      message: 'Email inválido!',
    }),
  password: z
    .string({
      required_error: 'Por favor, digite a senha!',
    })
    .min(8, {
      message: 'Senha deve conter mais de 8 caracteres.',
    }),
  favoriteGenre1: z.enum(GENRES, {
    required_error: 'Escolha os gêneros, por favor.',
  }),
  favoriteGenre2: z.enum(GENRES, {
    required_error: 'Escolha os gêneros, por favor.',
  }),
  gamesLife: z
    .string({
      required_error: 'Qual jogo mais te marcou?',
    })
    .min(4),
})

export interface IcreateUserSchema extends z.infer<typeof createUserSchema> {}
