import { z } from 'zod'

export const WishListSchema = z.object({
    productsCart: z.array(z.object({
        quantity: z.number({
            required_error: 'Quantity is required.',
            invalid_type_error: 'Quantity must be a number.'
        }).min(1, {
            message: 'Quantity must be at least 1.'
        }),
        url: z.string({
            required_error: 'URL is required.',
            invalid_type_error: 'URL must be a string.'
        }).url('Invalid URL format.')
    }))
})