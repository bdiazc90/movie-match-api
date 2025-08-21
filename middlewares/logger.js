export function logRequest(req, res, next) {
    const timestamp = Date.now();
    console.log(`${timestamp} 👉 [${req.method}] ${req.url}`);
    next();
}