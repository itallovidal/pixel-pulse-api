import z from 'zod'

export const createCommentDTO = z.object({
  comment: z.string().min(10),
  gameID: z.number().positive(),
  userID: z.string().uuid(),
  id: z.string().uuid(),
  likes: z.number(),
  dislikes: z.number(),
})

export interface ICreateCommentDTO extends z.infer<typeof createCommentDTO> {}

export const commentFromUserDTO = z.object({
  comment: z.string().min(10),
  gameID: z.number().positive(),
})

export interface ICommentFromUserDTO
  extends z.infer<typeof commentFromUserDTO> {}
