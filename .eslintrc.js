module.exports = {
	"parser": "babel-eslint",
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": [
		"airbnb"
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
		"no-tabs": 0,
		"indent": ["error", "tab"],
		"react/jsx-indent": ["error", "tab"],
		"react/jsx-indent-props": ["error", "tab"],
		"semi": ["error", "never"],
		"quotes": ["error", "double"],
		"func-style": ["error", "expression"],
		"arrow-parens": ["error", "as-needed"],
		"arrow-body-style": ["error", "as-needed"],
		"object-curly-spacing": ["error", "never"],
		"object-curly-newline": 0,
		"no-console": 0,
		"no-unused-vars": 0,
		"jsx-a11y/alt-text": 0,
		"jsx-a11y/click-events-have-key-events": 0,
		"jsx-a11y/no-static-element-interactions": 0,
		"react/jsx-filename-extension": 0,
		"react/jsx-one-expression-per-line": 0,
		"react/prop-types": 0,
		"import/prefer-default-export": 0,
		"camelcase": 0,
		"max-len": 0,
		"comma-dangle": 0,
		"prefer-template": 0
	},
	"settings": {
		"react": {
			"version": "detect"
		}
	}
}
