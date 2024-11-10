import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const compat = new FlatCompat({
    baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "airbnb-base",
    "prettier",
    "plugin:@typescript-eslint/recommended",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
    },

    rules: {
        "import/extensions": "off",
        "import/no-unresolved": "off",
        "import/no-extraneous-dependencies": "off",
    },
}, {
    ignores: [
        "dist/",
    ],
}];
