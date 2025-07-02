// Middleware para validar un esquema de Zod de forma asíncrona
export const validateSchema = (schema) => async (req, res, next) => {
  try {
    // Parsea y valida el cuerpo de la solicitud (req.body) contra el esquema proporcionado.
    // `parseAsync` se utiliza para manejar validaciones asíncronas si las hubiera.
    await schema.parseAsync(req.body);
    // Si la validación es exitosa, pasa al siguiente middleware o controlador.
    next();
  } catch (error) {
    // Si la validación falla, Zod arroja un error.
    // Se captura el error y se envía una respuesta de estado 400 (Bad Request).
    // El cuerpo de la respuesta es un array de mensajes de error extraídos del error de Zod.
    return res
      .status(400)
      .json(error.errors.map((error) => error.message));
  }
};
