module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    requireConfigFile: false,
    project: 'tsconfig.json',
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: ['jest', '@typescript-eslint/eslint-plugin'],
  // add your custom rules here
  rules: {
    // これがないと単一名称のコンポーネントを置けない
    'vue/multi-word-component-names': 'off',
  },
}
