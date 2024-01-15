import { z } from 'zod'

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export interface ILoginUserSchema extends z.infer<typeof LoginUserSchema> {}
