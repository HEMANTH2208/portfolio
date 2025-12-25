// Deployment Configuration
const deploymentConfig = {
    // GitHub Pages Configuration
    github: {
        repository: 'https://github.com/HEMANTH2208/portfolio.git',
        branch: 'main',
        buildDir: '.',
        customDomain: null, // Set to your custom domain if you have one
        cname: false
    },
    
    // Netlify Configuration
    netlify: {
        buildCommand: 'npm run build',
        publishDir: '.',
        redirects: [
            {
                from: '/admin',
                to: '/index.html#admin',
                status: 200
            }
        ],
        headers: [
            {
                for: '/*',
                values: {
                    'X-Frame-Options': 'DENY',
                    'X-XSS-Protection': '1; mode=block',
                    'X-Content-Type-Options': 'nosniff',
                    'Referrer-Policy': 'strict-origin-when-cross-origin'
                }
            },
            {
                for: '/assets/*',
                values: {
                    'Cache-Control': 'public, max-age=31536000'
                }
            }
        ]
    },
    
    // Vercel Configuration
    vercel: {
        buildCommand: 'npm run build',
        outputDirectory: '.',
        installCommand: 'npm install',
        devCommand: 'npm run dev',
        framework: null
    },
    
    // Performance Optimization
    optimization: {
        minifyCSS: true,
        minifyJS: true,
        optimizeImages: true,
        enableGzip: true,
        enableBrotli: true,
        cacheControl: {
            html: 'public, max-age=0, must-revalidate',
            css: 'public, max-age=31536000, immutable',
            js: 'public, max-age=31536000, immutable',
            images: 'public, max-age=31536000, immutable',
            fonts: 'public, max-age=31536000, immutable'
        }
    },
    
    // Security Headers
    security: {
        contentSecurityPolicy: {
            'default-src': ["'self'"],
            'script-src': ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com'],
            'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com'],
            'font-src': ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'],
            'img-src': ["'self'", 'data:', 'https:'],
            'connect-src': ["'self'"]
        },
        hsts: 'max-age=31536000; includeSubDomains; preload',
        frameOptions: 'DENY',
        contentTypeOptions: 'nosniff',
        xssProtection: '1; mode=block'
    }
};

module.exports = deploymentConfig;