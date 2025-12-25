module.exports = {
    extends: 'lighthouse:default',
    settings: {
        onlyAudits: [
            'first-contentful-paint',
            'largest-contentful-paint',
            'first-meaningful-paint',
            'speed-index',
            'interactive',
            'cumulative-layout-shift',
            'total-blocking-time'
        ],
        output: ['html', 'json'],
        outputPath: './docs/lighthouse-report'
    },
    audits: [
        'metrics/first-contentful-paint',
        'metrics/largest-contentful-paint',
        'metrics/cumulative-layout-shift',
        'metrics/total-blocking-time'
    ],
    categories: {
        performance: {
            title: 'Performance',
            auditRefs: [
                { id: 'first-contentful-paint', weight: 10 },
                { id: 'largest-contentful-paint', weight: 25 },
                { id: 'cumulative-layout-shift', weight: 25 },
                { id: 'total-blocking-time', weight: 30 }
            ]
        }
    }
};