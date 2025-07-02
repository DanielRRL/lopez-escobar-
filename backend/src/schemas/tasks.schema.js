import { z } from "zod";

// Esquema de validación para la creación de tareas.
export const createTaskSchema = z.object({
  // Valida el campo 'title'.
  title: z
    .string({
      // Mensaje de error si el título no es un string.
      required_error: "El titulo es requerido",
    })
    // Asegura que el título no esté vacío.
    .nonempty("El titulo es requerido")
    // Elimina espacios en blanco al principio y al final.
    .trim(),
  // Valida el campo 'description'.
  description: z
    .string()
    // Elimina espacios en blanco al principio y al final.
    .trim()
    // El campo es opcional.
    .optional(),
});

// Esquema de validación para la actualización de tareas.
export const updateTaskSchema = z.object({
  // Valida el campo 'title'.
  title: z
    .string({
      // Mensaje de error si el título no es un string.
      required_error: "El titulo es requerido",
    })
    // Asegura que el título no esté vacío si se proporciona.
    .nonempty("El titulo no puede estar vacio")
    // Elimina espacios en blanco al principio y al final.
    .trim()
    // El campo es opcional.
    .optional(),
  // Valida el campo 'description'.
  description: z
    .string()
    // Elimina espacios en blanco al principio y al final.
    .trim()
    // El campo es opcional.
    .optional(),
});
