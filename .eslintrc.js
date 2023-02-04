module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    requireConfigFile: false,
    project: 'tsconfig.json',
    sourceType: 'module',
    extraFileExtensions: [
      '.vue',
    ],
  },
  "parser": "vue-eslint-parser",
  extends: [
    'plugin:vue/vue3-recommended',
    'prettier',
    '@nuxt/eslint-config-typescript',
  ],
  plugins: ['vue', 'import'],
  // add your custom rules here
  rules: {
    // これがないと単一名称のコンポーネントを置けない
    'vue/multi-word-component-names': 'off',
  },
}
