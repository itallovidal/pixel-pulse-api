import z from 'zod'
export const idDTO = z.coerce.string().uuid()
export type IIdDTO = z.infer<typeof idDTO>
