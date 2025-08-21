export function responseOK(req, res, next) {
    // Guardar el método json original
  const originalJson = res.json;
  
  // Sobrescribir res.json
  res.json = function(data) {
    // Solo agregar "ok": true si el status es exitoso (2xx)
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const response = { ok: true, ...data };
      return originalJson.call(this, response);
    }
    // Si no es exitoso, enviar data original
    return originalJson.call(this, data);
  };
  
  next();
}