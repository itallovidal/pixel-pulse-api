import z from 'zod'

export const addToWishPlayDTO = z.object({
  gameID: z.number().positive(),
  userID: z.string().uuid(),
  id: z.string().uuid(),
})

export type IAddToWishPlayDTO = z.infer<typeof addToWishPlayDTO>
