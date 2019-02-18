module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'ember/jquery-ember-run': 0
  },
  "globals": {
    "document": true,
    "window": true,
    "moment": true,
    "_": true,
    "-Promise": true,
    "Immutable": true,
    "Rx": true,
    "S": true,
    "$": true,
    "google": true,
    "L": true,
    "TweenMax": true,
    "Linear": true,
    "numeral": true,
    "SignaturePad": true,
    "R": true,
    "localforage": true,
    "LE": true
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
