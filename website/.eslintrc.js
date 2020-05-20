module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/essential',
		'@holistic-web/eslint-config'
	],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

		'no-bitwise': 0, // allow '^' operator for mask positioning calculations
		'no-mixed-operators': 0	// Allow mixing '*' and '/' operators. Useful in image rotation.
	}
};
