import { z } from 'zod'

export const addProductSchema = z.object({
    name: z.string({
        required_error: 'Name is required.'
    }), 
    description: z.string({
        required_error: 'Description is required.'
    }),
    price: z.number({
        required_error: 'Price is required.'
    }),
    colors: z.array(z.string(), {
        required_error: 'Colors is required.'
    }),
    stock: z.number({
        required_error: 'Stock is required.'
    })
    
})