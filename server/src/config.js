import { config } from 'dotenv'

config() // Load environment variables to read them later.

export const PORT = process.env.PORT || 3000

export const TOKEN_SECRET = 'some secret'

export const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY // Leemos las variable de entorno

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/OlimpusDB'

export const FRONT_END_URL = process.env.FRONT_END_URL || 'http://localhost:5173'

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

export const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;

export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;

export const PRESET_NAME = process.env.PRESET_NAME;

export const CLOUD_NAME = process.env.CLOUD_NAME;

export const RESEND_API_KEY = process.env.RESEND_API_KEY