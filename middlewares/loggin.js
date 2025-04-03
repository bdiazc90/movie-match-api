export function logginRequest(req, res, next) {
	// console log de la peticion: incluyendo timestamp, method, url y headers
	const timestamp = new Date().toISOString();
	const method = req.method; // GET, POST, PUT, DELETE
	const url = req.originalUrl; // Hacia qué ruta va la solicitud
	const headers = JSON.stringify(req.headers, null, 2);
	console.log(`----> ⚡️ [${timestamp}] ${method} ${url}`);
	if (url.includes("bruno")) {
		console.log("----> ❌ Middleware prohibe esta solicitud.");
		return res.status(403).json({ message: "Prohibido" });
	}
	next(); // Pase el middleware:
}
