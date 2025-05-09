import { defineConfig } from "eslint/config";
import _import from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"),

    plugins: {
        import: fixupPluginRules(_import),
        prettier,
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {
        "@typescript-eslint/no-unused-expressions": ["error", {
            allowShortCircuit: true,
        }],

        "@typescript-eslint/naming-convention": ["error", {
            selector: "interface",
            format: ["PascalCase"],

            custom: {
                regex: "^I[A-Z]",
                match: false,
            },
        }],

        "max-lines-per-function": ["error", 125],
        indent: ["error", "tab"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "prefer-const": "warn",
        "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
        
        
    },
}]);
// import { defineConfig } from "eslint/config";
// import { fixupPluginRules } from "@eslint/compat";
// import globals from "globals";
// import tsParser from "@typescript-eslint/parser";
// import path from "node:path";
// import { fileURLToPath } from "node:url";
// import js from "@eslint/js";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//     baseDirectory: __dirname,
//     recommendedConfig: js.configs.recommended,
//     allConfig: js.configs.all
// });

// export default defineConfig([{
//     extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"),
//     plugins: {
//         import: fixupPluginRules(_import),
//         prettier,
//         "@typescript-eslint": typescriptEslint,
//     },
//     rules: {
//         ...compat.configs.recommended.rules,
//         "max-len": ["error", { "code": 80 }],
//         "indent": ["error", 2],
//         "@typescript-eslint/member-delimiter-style": ["error", {
//             "multiline": {
//                 "delimiter": "semi",
//                 "requireLast": true
//             },
//             "singleline": {
//                 "delimiter": "semi",
//                 "requireLast": false
//             }
//         }]
//     }
// }]);