import { z } from 'zod'

export const NewSchema = z.object({
    title: z.string({
        required_error: 'Title is required.'
    }),
    description: z.string({
        required_error: 'Description is required.'
    }),
    endDate: z.string({
        required_error: 'End Date is required.'
    }),
})
