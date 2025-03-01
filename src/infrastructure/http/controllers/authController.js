import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import { getUserById } from "../../../app/tables/userService.js";
dotenv.config();
// Crear una instancia del cliente Cognito
const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const calculateSecretHash = (username) => {
  return crypto
    .createHmac("sha256", CLIENT_SECRET)
    .update(username + CLIENT_ID)
    .digest("base64");
};

// Validar contraseña antes de enviarla a Cognito
const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
};

// Función para registrar al usuario en Cognito
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({
      message:
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.",
    });
  }

  // Calculamos el SECRET_HASH
  const secretHash = calculateSecretHash(email);

  const params = {
    ClientId: CLIENT_ID,
    SecretHash: secretHash,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "given_name", Value: name },
    ],
  };

  try {
    const data = await client.send(new SignUpCommand(params));
    res.status(201).json({
      message:
        "Usuario registrado correctamente. Verifique su correo para confirmar su cuenta.",
      userId: data.UserSub,
    });
  } catch (err) {
    console.error("Error al registrar usuario en Cognito:", err);
    res.status(500).json({
      message: "Error al registrar el usuario en Cognito",
      error: err.message,
    });
  }
};

// Función para confirmar el usuario en Cognito
export const confirmUser = async (req, res) => {
  const { email, code, rememberMe } = req.body;
  if (!email || !code) {
    return res
      .status(400)
      .json({ message: "Email y código de verificación son requeridos" });
  }

  // Calculamos el SECRET_HASH
  const secretHash = calculateSecretHash(email);

  const params = {
    Username: email,
    ConfirmationCode: code,
    ClientId: CLIENT_ID,
    SecretHash: secretHash,
  };
  // estacontraseñaPrueba123...
  try {
    const data = await client.send(new ConfirmSignUpCommand(params));
    res
      .cookie("id_token", data.Session, {
        maxAge: rememberMe ? 1000 * 240 : 1000 * 120, // 120 segundos o 240 segundos
        httpOnly: false,
      })
      .status(200)
      .json({
        message: "Usuario confirmado exitosamente",
        userId: data.UserSub,
        data,
      });
  } catch (error) {
    console.error("Error al confirmar usuario:", error);
    res
      .status(500)
      .json({ message: "Error al confirmar usuario", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "El correo y la contraseña son requeridos" });
  }

  const params = {
    AuthFlow: process.env.AUTH_FLOW,
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: calculateSecretHash(email),
    },
  };

  try {
    const data = await client.send(new InitiateAuthCommand(params));

    // Decodificar el IdToken para obtener el ID del usuario
    const decodedToken = jwt.decode(data.AuthenticationResult.IdToken);
    const userId = decodedToken?.sub; // ID único del usuario en Cognito
    const user = await getUserById(userId);
    res.status(200).json({
      id_user: user.id_user,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      dataAccess: {
        message: "Inicio de sesión exitoso",
        accessToken: data.AuthenticationResult.AccessToken,
        idToken: data.AuthenticationResult.IdToken,
        refreshToken: data.AuthenticationResult.RefreshToken,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    let errorMessage = "Error desconocido";
    if (error.name === "NotAuthorizedException") {
      errorMessage = "Credenciales incorrectas";
    } else if (error.name === "UserNotFoundException") {
      errorMessage = "Usuario no encontrado";
    } else if (error.name === "UserNotConfirmedException") {
      errorMessage = "Usuario no confirmado. Verifica tu correo.";
    }

    res.status(401).json({ message: errorMessage, error: error });
  }
};
