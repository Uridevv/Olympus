import { z } from 'zod'

export const ProductImageSchema = z.object({
    url: z.string({
        required_error: 'URl is required.'
    }),
    public_id: z.string({
        required_error: 'Public ID is required.'
    }),
    color: z.string({
        required_error: 'Color is required.'
    })

})