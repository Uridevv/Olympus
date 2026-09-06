import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET, AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '../config.js'
import OTP from '../models/otp.model.js'
import UserSettings from '../models/userSettings.model.js'


export const getUser = async (req, res) => {

  const { email, password } = req.body
  try {

    // Verificar que el usuario exista.
    const userFound = await User.findOne({ email })
    if (!userFound) return res.status(400).json({ message: 'Email dont exist.' })

    //Verificar que la contraseña conincida con la de la base de datos.
    const isMatch = bcrypt.compareSync(password, userFound.password)
    if (!isMatch) return res.status(400).json({ message: 'Incorrect Credentials' })

    res.json({
      _id: userFound._id,
      userImage: userFound.userImage,
      name: userFound.name,
      lastName: userFound.lastName,
      email: userFound.email,
      phoneNumber: userFound.phoneNumber,
      password: userFound.password,
      role: userFound.role
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}

export const register = async (req, res) => {
  const { name, lastName, email, phoneNumber, password, role } = req.body
  try {

    //Verificar que no exista.
    const userFound = await User.findOne({ email })
    if (userFound) return res.status(400).send('The email is already in use.')

    //Encriptar password.
    const passwordHash = bcrypt.hashSync(password, 10)

    //Crear instancia del usuario.
    const newUser = new User({
      name,
      lastName,
      email,
      phoneNumber,
      password: passwordHash,
      role
    })

    //Guardar el usuario en la BD.
    const userSaved = await newUser.save()

    //Creamos las configuraciones por defecto del perfil de usuario.
    const newUserSettings = new UserSettings({
      userId: userSaved._id,
    })

    await newUserSettings.save();

    //Crear el token.
    const token = await createAccessToken({ id: userSaved._id })

    //Crear la cookie para el token.
    res.cookie('token', token)

    //Devolvemos los datos en el response.
    res.json({
      _id: userSaved._id,
      userImage,
      name,
      lastName,
      email,
      phoneNumber,
      password,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt

    })
  } catch (error) {
    res.status(500).json(error.message)
  }

}

export const registerNewAdmin = async (req, res) => {
  const { name, lastName, email, phoneNumber, password, role } = req.body
  try {

    //Verificar que no exista.
    const userFound = await User.findOne({ email })
    if (userFound) return res.status(400).send('The email is already in use.')

    //Encriptar password.
    const passwordHash = bcrypt.hashSync(password, 10)

    //Crear instancia del usuario.
    const newUser = new User({
      name,
      lastName,
      email,
      phoneNumber,
      password: passwordHash,
      role: role || "admin"
    })

    //Guardar el usuario en la BD.
    const userSaved = await newUser.save()

    //Creamos las configuraciones por defecto del perfil de usuario.
    const newUserSettings = new UserSettings({
      userId: userSaved._id,
    })

    await newUserSettings.save();

    //Devolvemos los datos en el response.
    res.json({
      _id: userSaved._id,
      name,
      lastName,
      email,
      phoneNumber,
      password,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt

    })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const loginAdminAuth0 = async (req, res) => {
  const { name, lastName, email, auth0Sub, auth0Verification, userImage, role } = req.body
  try {

    //Verificar que no exista, si existe, iniciamos sesion.
    const userFound = await User.findOne({ email })
    if (userFound) return res.status(400).json({ message: "Email already exist." })

    //Crear instancia del usuario.
    const newAdmin = new User({
      name,
      lastName,
      email,
      auth0Sub,
      auth0Verification,
      userImage,
      role,
      password: "",
    })

    //Guardar el usuario en la BD.
    const adminSaved = await newAdmin.save()

    //Crear el token.
    const token = await createAccessToken({ id: adminSaved._id })

    //Crear la cookie para el token.
    res.cookie('token', token)

    //Devolvemos los datos en el response.
    res.status(200).json({
      _id: adminSaved._id,
      userImage: adminSaved._id,
      name,
      lastName,
      email,
      phoneNumber,
      password,
      createdAt: adminSaved.createdAt,
      updatedAt: adminSaved.updatedAt

    })

  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "Email dont exist." });

    const settingsFound = await UserSettings.findOne({ userId: userFound._id })
    if (!settingsFound) return res.status(404).json({ message: "User settings not found" })

    const isMatch = bcrypt.compareSync(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect Credentials" });

    // ✅ Si no tiene OTP activado, login normal
    if (!settingsFound.twoFactorAuth) {
      const token = await createAccessToken({ id: userFound._id });
      res.cookie("token", token, { sameSite: "none", secure: true, httpOnly: false });
      return res.status(200).json({ message: "success", user: userFound });
    }

    // 🚨 Si tiene OTP, devolvemos un token temporal de verificación
    const tempToken = await createAccessToken(
      { id: userFound._id, otpStep: true },
      "5m" // expira en 5 minutos
    );

    return res.status(200).json({ message: "otp_required", tempToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtpLogin = async (req, res) => {
  const { otp, tempToken } = req.body;

  try {
    // Validar el tempToken
    const decoded = jwt.verify(tempToken, TOKEN_SECRET);
    if (!decoded || !decoded.otpStep) {
      return res.status(401).json({ message: "Unauthorized or expired session" });
    }

    const userFound = await User.findById(decoded.id);
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    // Buscar OTP en DB
    const otpFound = await OTP.findOne({ email: "calogerou1406@gmail.com" });
    if (!otpFound || otpFound.code !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ OTP válido → crear token real de sesión
    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token, { sameSite: "none", secure: true, httpOnly: false });
    return res.json(userFound );

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginWithAuth0 = async (req, res) => {
  const { name, lastName, email, auth0Sub, auth0Verification, userImage } = req.body
  try {

    //Verificar que no exista, si existe, iniciamos sesion.
    const userFound = await User.findOne({ email })
    if (userFound) {
      const token = await createAccessToken({ id: userFound._id })

      // Establecer la cookie.
      res.cookie('token', token, {
        sameSite: 'none', // la cookie no esta en el mismo dominio
        secure: true,
        httpOnly: false
      })

      res.json({
        _id: userFound._id,
        userImage: userFound.userImage,
        name: userFound.name,
        lastName: userFound.lastName,
        email: userFound.email,
        phoneNumber: userFound.phoneNumber,
        password: userFound.password,
        role: userFound.role
      })
    } else {

      //Crear instancia del usuario.
      const newUser = new User({
        name,
        lastName,
        email,
        auth0Sub,
        auth0Verification,
        userImage,
        role: "user",
        password: "",
      })

      //Guardar el usuario en la BD.
      const userSaved = await newUser.save()

      //Crear el token.
      const token = await createAccessToken({ id: userSaved._id })

      //Crear la cookie para el token.
      res.cookie('token', token)

      //Devolvemos los datos en el response.
      res.status(200).json({
        _id: userSaved._id,
        userImage: userSaved._id,
        name,
        lastName,
        email,
        phoneNumber,
        password,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt

      })
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const logout = (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

export const verifyToken = (req, res) => {
  const { token } = req.cookies

  if (!token) res.status(401).json({ message: 'Unauthorized.' })

  jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ message: 'Unauthorized.' })
    }

    const userFound = await User.findById(decoded.id)
    if (!userFound) {
      res.status(401).json({ message: 'Unauthorized, USer not found.' })
    }
    return res.json({
      _id: userFound._id,
      email: userFound.email,
      name: userFound.name,
      role: userFound.role,
      lastName: userFound.lastName
    })

  })
}

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)

  if (!userFound) res.status(404).json({ message: 'User not Found' })

  res.json({
    _id: userFound._id,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  })
}