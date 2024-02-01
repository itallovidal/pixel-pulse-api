import { z } from 'zod'

export const loginUserDTO = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export interface ILoginUserDTO extends z.infer<typeof loginUserDTO> {}
