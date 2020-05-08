module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['@holistic-web/eslint-config'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
	}
};
