import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string({
        required_error: 'Name is required.'
    }),
    lastName: z.string({
        required_error: 'Last name is required.'
    }),
    email: z.string({
        required_error: 'Email is required.'
    }).email({
        message: 'Invalid Email.'
    }),
    phoneNumber: z.number({
        required_error: 'Phone number is required.'
    }),
    password: z.string({
        required_error: 'Password is required.'
    }).min(6, {
        message: 'Password must be at least 6 characters'
    }),
    role: z.string().optional(),
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required.'
    }).email({
        message: 'Invalid Email.'
    }),
    password: z.string({
        required_error: 'Password is required.'
    })

})