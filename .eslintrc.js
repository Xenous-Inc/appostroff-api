module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    plugins: ['import', '@typescript-eslint', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
    },
    env: {
        node: true,
        commonjs: true,
        jest: true,
    },
    rules: {
        // local syntax principles
        'quotes': ['error', 'single'],
        'no-multi-spaces': 'error',
        'comma-style': ['error', 'last'],
        'func-call-spacing': ['error', 'never'],
        'function-paren-newline': ['error', 'consistent'],
        'key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'interface',
                format: ['PascalCase'],
                prefix: ['I'],
            },
        ],
        'linebreak-style': ['error', 'unix'],
        // easy-to-read-and-refactor syntax
        '@typescript-eslint/no-shadow': ['error', { hoist: 'never' }],
        'no-else-return': ['error', { allowElseIf: false }],
        'func-names': ['error', 'never'],
        'dot-notation': 'error',
        'default-case-last': 'error',
        // code security enhancing syntax
        'init-declarations': ['warn', 'always'],
        'default-param-last': 'error',
        'default-case': 'error',
        // code cleanup rules
        '@typescript-eslint/no-unused-vars': 'warn',
        // hindering and useless syntax
        'no-shadow': 'off',
        'no-unused-vars': 'off',
        'max-classes-per-file': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        // prettier config
        'prettier/prettier': [
            'error',
            {
                bracketSpacing: true,
                jsxBracketSameLine: false,
                jsxSingleQuote: true,
                printWidth: 120,
                semi: true,
                singleQuote: true,
                tabWidth: 4,
                trailingComma: 'all',
                quoteProps: 'consistent',
                arrowParens: 'avoid',
            },
        ],
    },
};
