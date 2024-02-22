import z from 'zod'

export const gameIDDTO = z.coerce.number().positive()

export type IGameIDDTO = z.infer<typeof gameIDDTO>
