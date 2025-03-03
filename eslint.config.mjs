import globals from 'globals';
import pluginJs from '@eslint/js';
import airbnbBase from 'eslint-config-airbnb-base';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.node },
  },
  pluginJs.configs.recommended,
  airbnbBase, // Adiciona as regras do Airbnb
  prettier, // Desativa regras conflitantes com Prettier

  {
    plugins: { prettier: pluginPrettier },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'on', // Permite console.log()
      'comma-dangle': ['error', 'never'], // Remove necessidade de vírgulas finais
      quotes: ['error', 'double'], // Usa aspas simples
    },
  },
];
