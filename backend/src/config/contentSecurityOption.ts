export const contentSecurityConfig = {
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'trusted-scripts.com'"],
        styleSrc: ["'self'", "'trusted-styles.com'"],
        imgSrc: ["'self'", "data:", "trusted-images.com"]
    }
}