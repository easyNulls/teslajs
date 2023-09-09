module.exports = {
  globals: {
    __DEV__: true
  },
  env: {
    commonjs: true,
    // 'es2021': true
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module', // 指定来源的类型，有两种”script”或”module”
    project: ['tsconfig.json']
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/indent': 'off',
    // '@typescript-eslint/indent': ['error', 2, {
    //   // 'SwitchCase': 1,
    //   'MemberExpression': 1,
    //   'VariableDeclarator': { 'var': 2, 'let': 2, 'const': 2 },
    //   'flatTernaryExpressions': true,
    //   'StaticBlock': { 'body': 2 },
    //   'FunctionExpression': { 'body': 2, 'parameters': 2 },
    //   'FunctionDeclaration': { 'body': 4, 'parameters': 2 },
    //   'ArrayExpression': 1,
    //   'CallExpression': { 'arguments': 2 }
    // }],
    'no-unused-expressions': 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'none',
        'requireLast': false
      },
      'singleline': {
        'delimiter': 'semi',
        'requireLast': false
      }
    }],

    'camelcase': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': ['off', { functions: true, classes: true }],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    // '@typescript-eslint/naming-convention': ['off', { selector: 'interface', format: ['camelCase'] }]
  },
  settings: {
  }
}
