module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'import/prefer-default-export': 'off',
    'comma-dangle': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/no-danger': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'new-cap': 0,
    'arrow-body-style': 0,
    'no-restricted-exports': 0,
    'react/jsx-props-no-spreading': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto'
      }
    ],
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true
      },
      {
        enforceForRenamedProperties: true
      }
    ]
  },
  settings: {
    react: {
      version: 'detect' // Detect react version
    }
  }
};
