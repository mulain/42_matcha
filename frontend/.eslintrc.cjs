module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-spacing': 'error',
    'no-duplicate-imports': 'error',
    'no-unused-expressions': 'error',
    'no-unreachable': 'error',
    'no-constant-condition': 'error',
    'no-empty': 'error',
    'no-extra-semi': 'error',
    'no-irregular-whitespace': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-trailing-spaces': 'error',
    'eol-last': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': ['error', { code: 100, ignoreUrls: true }],
    camelcase: ['error', { properties: 'never' }],
    'no-underscore-dangle': 'error',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'no-param-reassign': 'error',
    'no-return-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'require-await': 'error',
    yoda: 'error',
    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],
    'brace-style': ['error', '1tbs'],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'func-call-spacing': ['error', 'never'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': ['error', 'always'],
    'switch-colon-spacing': 'error',
    'template-tag-spacing': 'error',
    'arrow-parens': ['error', 'always'],
    'generator-star-spacing': ['error', { before: false, after: true }],
    'rest-spread-spacing': ['error', 'never'],
    'yield-star-spacing': ['error', 'after'],
    'no-confusing-arrow': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-rename': 'error',
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'operator-linebreak': ['error', 'before'],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'no-trailing-spaces': 'error',
    'eol-last': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-tabs': 'error',
    'no-whitespace-before-property': 'error',
    'object-curly-newline': ['error', { multiline: true, consistent: true }],
    'array-element-newline': ['error', 'consistent'],
    'array-bracket-newline': ['error', 'consistent'],
    'function-paren-newline': ['error', 'consistent'],
    'function-call-argument-newline': ['error', 'consistent'],
    'operator-linebreak': ['error', 'before'],
    'implicit-arrow-linebreak': ['error', 'beside'],
    'no-ternary': 'off',
    'no-negated-condition': 'off',
    'no-magic-numbers': 'off',
    'no-undefined': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['error'],
    'no-return-await': 'off',
    '@typescript-eslint/return-await': ['error'],
    'no-throw-literal': 'off',
    '@typescript-eslint/no-throw-literal': ['error'],
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error'],
    'no-implied-eval': 'off',
    '@typescript-eslint/no-implied-eval': ['error'],
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': ['error'],
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': ['error'],
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': ['error'],
    'no-invalid-this': 'off',
    '@typescript-eslint/no-invalid-this': ['error'],
    'no-loop-func': 'off',
    '@typescript-eslint/no-loop-func': ['error'],
    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': ['error'],
    'no-misused-new': 'off',
    '@typescript-eslint/no-misused-new': ['error'],
    'no-misused-promises': 'off',
    '@typescript-eslint/no-misused-promises': ['error'],
    'no-new-func': 'off',
    '@typescript-eslint/no-new-func': ['error'],
    'no-obj-calls': 'off',
    '@typescript-eslint/no-obj-calls': ['error'],
    'no-return-assign': 'off',
    '@typescript-eslint/no-return-assign': ['error'],
    'no-self-compare': 'off',
    '@typescript-eslint/no-self-compare': ['error'],
    'no-sequences': 'off',
    '@typescript-eslint/no-sequences': ['error'],
    'no-throw-literal': 'off',
    '@typescript-eslint/no-throw-literal': ['error'],
    'no-unmodified-loop-condition': 'off',
    '@typescript-eslint/no-unmodified-loop-condition': ['error'],
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error'],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    'prefer-const': 'off',
    '@typescript-eslint/prefer-const': ['error'],
    'prefer-namespace-keyword': 'off',
    '@typescript-eslint/prefer-namespace-keyword': ['error'],
    'prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': ['error'],
    'prefer-optional-chain': 'off',
    '@typescript-eslint/prefer-optional-chain': ['error'],
    'prefer-readonly': 'off',
    '@typescript-eslint/prefer-readonly': ['error'],
    'prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': ['error'],
    'prefer-reduce-type-parameter': 'off',
    '@typescript-eslint/prefer-reduce-type-parameter': ['error'],
    'prefer-string-starts-ends-with': 'off',
    '@typescript-eslint/prefer-string-starts-ends-with': ['error'],
    'prefer-ts-expect-error': 'off',
    '@typescript-eslint/prefer-ts-expect-error': ['error'],
    'require-array-sort-compare': 'off',
    '@typescript-eslint/require-array-sort-compare': ['error'],
    'require-await': 'off',
    '@typescript-eslint/require-await': ['error'],
    'return-await': 'off',
    '@typescript-eslint/return-await': ['error'],
    'unbound-method': 'off',
    '@typescript-eslint/unbound-method': ['error'],
    'use-isnan': 'off',
    '@typescript-eslint/use-isnan': ['error'],
    'valid-typeof': 'off',
    '@typescript-eslint/valid-typeof': ['error'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
