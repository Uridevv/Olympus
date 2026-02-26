import { TOKEN_SECRET } from '../config.js'
import jwt from 'jsonwebtoken'

export const createAccessToken = (payload) => {
    try {
        return new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                TOKEN_SECRET,
                {
                    expiresIn: "1d"
                },
                (err, token) => {
                    if (err) reject(err)
                    resolve(token)
                }
            )
        })
    } catch (error) {
        console.log(error)
        throw new Error('Error creating access token:' + error.message)
    }
}