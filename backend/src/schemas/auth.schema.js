import { z } from "zod";

// Esquema de validación para el registro de usuarios.
export const registerSchema = z.object({
  // Valida el campo 'name'.
  name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .nonempty("El nombre es requerido")
    .trim(),
  // Valida el campo 'lastName'.
  lastName: z
    .string({
      required_error: "El apellido es requerido",
    })
    .nonempty("El apellido es requerido")
    .trim(),
  // Valida el campo 'email'.
  email: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({ message: "Correo invalido" })
    .nonempty("El correo es requerido")
    .trim(),
  // Valida el campo 'phone'.
  phone: z
    .string({
      required_error: "El telefono es requerido",
    })
    // Valida que el teléfono tenga un formato válido.
    .regex(/^[0-9+()-]{8,15}$/, "El formato del telefono es invalido")
    .nonempty("El telefono es requerido")
    .trim(),
  // Valida el campo 'password'.
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    // Asegura que la contraseña tenga al menos 6 caracteres.
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .trim(),
});

// Esquema de validación para el inicio de sesión de usuarios.
export const loginSchema = z.object({
  // Valida el campo 'email'.
  email: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({ message: "Correo invalido" })
    .nonempty("El correo es requerido")
    .trim(),
  // Valida el campo 'password'.
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    // Asegura que la contraseña tenga al menos 6 caracteres.
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .trim(),
});
