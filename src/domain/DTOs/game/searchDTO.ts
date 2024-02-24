import z from 'zod'
export const searchDTO = z.string().min(2)
export type ISearchDTO = z.infer<typeof searchDTO>
