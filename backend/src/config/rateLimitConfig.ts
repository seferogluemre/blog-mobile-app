import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 50,
    message: { error: "Çok fazla istek yaptınız, lütfen daha sonra tekrar deneyin." },
    headers: true,
    standardHeaders: true,
    legacyHeaders: false,
});