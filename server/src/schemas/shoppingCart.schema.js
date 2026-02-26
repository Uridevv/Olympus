import { z } from 'zod';

// Validación principal del shopping cart
export const shoppingCartSchema = z.object({
    userId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid MongoDB ObjectId'),
    status: z.enum(['active', 'completed', 'abandoned']).optional(), // Por defecto es 'active'
    productsCart: z.array(z.object({
        productId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid MongoDB ObjectId'),
        quantity: z.number().min(1, 'Quantity must be at least 1'),
        url: z.string().url('Invalid URL format')
    })),
    totalPrice: z.number().min(0, "Total price must be at least 0")
});
