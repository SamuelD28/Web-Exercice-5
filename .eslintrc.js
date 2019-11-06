module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
  },
  'rules': {
	'require-jsdoc' : ['off'],
	'max-len': ['error', {'code' : 120}]
  },
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module'
  }
};
