import z from 'zod'
export const ratingGameDTO = z.object({
  gameID: z.coerce.number().positive(),
  stars: z.number().min(1).max(5),
})

export interface IRatingGameDTO extends z.infer<typeof ratingGameDTO> {}
