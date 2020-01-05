module.exports = {
	"parser": "babel-eslint",
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:import/recommended"
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"import"
	],
	"rules": {
		"indent": ["error", "tab"],
		"quotes": ["error", "double"],
		"semi": ["error", "never"],
		"func-style": ["error", "declaration", { "allowArrowFunctions": true }],
		"no-unused-vars": 1
	},
	"settings": {
		"react": {
			"version": "detect"
		}
	}
}
