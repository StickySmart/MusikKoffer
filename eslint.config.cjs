/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  // Ignorieren von Ordnern, die nicht gelintet werden sollen
  {
    ignores: [
      '**/node_modules/**',
      '**/.vs/**',
      '**/dist/**',
      '**/build/**',
      '**/bin/**',
      '**/obj/**'
    ]
  },

  // Standard: Browser/ESM (für deine Web-Dateien)
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        // Web APIs, die du nutzt
        fetch: 'readonly',
        Blob: 'readonly',
        URL: 'readonly',
        self: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error'
    }
  },

  // Override: Node/CommonJS für die ESLint-Config & CJS/Node-Skripte
  {
    files: ['eslint.config.cjs', '**/*.cjs', 'scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
        // falls deine Node-Skripte fetch/URL/Blob nutzen (Node 18+)
        fetch: 'readonly',
        URL: 'readonly',
        Blob: 'readonly'
      }
    }
  }
];

