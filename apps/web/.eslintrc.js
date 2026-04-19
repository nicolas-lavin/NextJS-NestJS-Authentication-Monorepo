/** @type {import("eslint").Linter.Config} */
import unusedImports from "eslint-plugin-unused-imports";

module.exports = {
	root: true,
	extends: ["@repo/eslint-config/next.js"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: true,
	},
	plugins: {
		"unused-imports": unusedImports,
	},
	rules: {
		"no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
		"unused-imports/no-unused-imports": "error",
		"unused-imports/no-unused-vars": [
			"warn",
			{
				vars: "all",
				varsIgnorePattern: "^_",
				args: "after-used",
				argsIgnorePattern: "^_",
			},
		],
	},
};
