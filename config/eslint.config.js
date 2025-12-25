module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-unused-vars': 'warn',
        'no-console': 'warn',
        'no-debugger': 'error',
        'prefer-const': 'error',
        'no-var': 'error',
        'arrow-spacing': 'error',
        'comma-dangle': ['error', 'never'],
        'eol-last': 'error',
        'func-call-spacing': 'error',
        'key-spacing': 'error',
        'keyword-spacing': 'error',
        'no-multiple-empty-lines': ['error', { max: 2 }],
        'no-trailing-spaces': 'error',
        'object-curly-spacing': ['error', 'always'],
        'space-before-blocks': 'error',
        'space-in-parens': 'error'
    },
    globals: {
        'showNotification': 'readonly',
        'adminPanel': 'writable'
    }
};