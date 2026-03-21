import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.ts'],
    extends: [js.configs.recommended, tseslint.configs.recommended, prettierConfig],
    plugins: { prettier },
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  }
)
