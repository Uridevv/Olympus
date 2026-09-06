import { z } from 'zod'

export const NotificationSchema = z.object({
    user: z.string({
        required_error: 'User is required.'
    }),
    title: z.string({
        required_error: 'Title is required.'
    }),
    message: z.string({
        required_error: 'Message is required.'
    }),
    type: z.enum(['promociones', 'estatus de pedidos', 'novedades'], {
        required_error: 'Type is required.',
        invalid_type_error: 'Type must be one of: promociones, estatus de pedidos, novedades.'
    }),
    status: z.enum(['leido', 'sin leer'], {
        invalid_type_error: 'Status must be one of: leido, sin leer.'
    }).optional(),
})

export const UpdateNotificationStatusSchema = z.object({
    status: z.enum(['leido', 'sin leer'], {
        required_error: 'Status is required.',
        invalid_type_error: 'Status must be one of: leido, sin leer.'
    })
})
