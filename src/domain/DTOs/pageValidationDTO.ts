import { z } from 'zod'

export const pageValidationDTO = z.coerce.number().min(0)

export type IPageValidationDTO = z.infer<typeof pageValidationDTO>
