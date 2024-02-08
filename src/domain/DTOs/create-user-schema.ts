import { z } from 'zod'

export const GENRES = [
  {
    id: 4,
    name: 'Fighting',
    brName: 'Luta',
  },
  {
    id: 5,
    name: 'Shooter',
    brName: 'Tiro',
  },
  {
    id: 7,
    name: 'Music',
    brName: 'Música',
  },
  {
    id: 8,
    name: 'Platform',
    brName: 'Plataforma',
  },
  {
    id: 9,
    name: 'Puzzle',
    brName: 'Quebra Cabeças',
  },
  {
    id: 10,
    name: 'Racing',
    brName: 'Corrida',
  },
  {
    id: 11,
    name: 'Real Time Strategy (RTS)',
    brName: `RTS`,
  },
  {
    id: 12,
    name: 'Role-playing (RPG)',
    brName: 'RPG',
  },
  {
    id: 13,
    name: 'Simulator',
    brName: 'Simulador',
  },
  {
    id: 14,
    name: 'Sport',
    brName: 'Esportes',
  },
  {
    id: 15,
    name: 'Strategy',
    brName: 'Estratégia',
  },
  {
    id: 16,
    name: 'Turn-based strategy (TBS)',
    brName: 'TBS',
  },
  {
    id: 24,
    name: 'Tactical',
    brName: 'Tático',
  },
  {
    id: 26,
    name: 'Quiz/Trivia',
    brName: 'Quiz',
  },
  {
    id: 25,
    name: "Hack and slash/Beat 'em up",
    brName: 'Hack and Slash',
  },
  {
    id: 30,
    name: 'Pinball',
    brName: 'Pinball',
  },
  {
    id: 31,
    name: 'Adventure',
    brName: 'Aventura',
  },
  {
    id: 33,
    name: 'Arcade',
    brName: 'Arcade',
  },
  {
    id: 34,
    name: 'Visual Novel',
    brName: 'Visual',
  },
  {
    id: 32,
    name: 'Indie',
    brName: 'Indies',
  },
  {
    id: 35,
    name: 'Card & Board Game',
    brName: 'CardGame',
  },
  {
    id: 36,
    name: 'MOBA',
    brName: 'Moba',
  },
  {
    id: 2,
    name: 'Point-and-click',
    brName: 'Friv Style',
  },
]

export const createUserDTO = z.object({
  name: z.string().min(5),
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
  favGenre1: z
    .number({
      required_error: 'Por favor, escolha seu gênero favorito 1!',
    })
    .refine((arg) => {
      return GENRES.some((genre) => {
        return genre.id === arg
      })
    }),
  favGenre2: z
    .number({
      required_error: 'Por favor, escolha seu gênero favorito 1!',
    })
    .refine((arg) => {
      return GENRES.some((genre) => {
        return genre.id === arg
      })
    }),
  favoriteGame: z
    .string({
      required_error: 'Qual jogo mais te marcou?',
    })
    .min(4),
})

export interface ICreateUserDTO extends z.infer<typeof createUserDTO> {}
