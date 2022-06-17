module.exports = {
    "root": true,
    "parserOptions": {
        "parser": "@babel/eslint-parser",
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    // An environment defines global variables that are predefined.
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true,
        "jquery": true
    },
    // To configure global variables inside of a configuration file, set the globals configuration property to an object containing keys named for each of the global variables you want to use. For each global variable key, set the corresponding value equal to "writable" to allow the variable to be overwritten or "readonly" to disallow overwriting.
    "globals": {
        "jsVars": "readonly"
    },
    // To configure plugins inside of a configuration file, use the plugins key, which contains a list of plugin names. The eslint-plugin- prefix can be omitted from the plugin name.
    "plugins": [
        "vue"
    ],
    "extends": [
        "eslint:recommended",
        "airbnb-base",
        "plugin:vue/recommended"
    ],
    "settings": {
        "import/resolver": {
            "webpack": {
                "config": "webpack.config.js",
                "extensions": [ ".js", ".jsx", ".vue" ]
            },
        }
    },
    // "off" or 0 - turn the rule off
    // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    // "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
    "rules": {
        "no-extra-boolean-cast": "warn",
        /** airbnb-base: errors */
        "no-console": "off",
        "no-constant-condition": "off",
        /** airbnb-base: best practices */
        "guard-for-in": "off",
        "no-param-reassign": ["warn", {
            "props": true,
            "ignorePropertyModificationsFor": [
                "acc", // for reduce accumulators
                "accumulator", // for reduce accumulators
                "e", // for e.returnvalue
                "ctx", // for Koa routing
                "req", // for Express requests
                "request", // for Express requests
                "res", // for Express responses
                "response", // for Express responses
                "$scope", // for Angular 1 scopes

                "state", // for Vuex
                "params",
                "payload"
            ]
        }],
        "no-script-url": "warn",
        "no-warning-comments": ["error", {
            "terms": ["todo", "fixme"],
            "location": "start"
        }],
        "radix": ["error", "as-needed"],
        "yoda": ["error", "never", {
            "exceptRange": true
        }],
        "array-callback-return": ["error", {
            "allowImplicit": false
        }],
        /** airbnb-base: variables */
        "no-undef": ["error", {
            "typeof": false
        }],
        "no-unused-vars": "warn",
        /** airbnb-base: style */
        "camelcase": ["off", {
            "properties": "never",
            "ignoreDestructuring": true,
        }],
        "eol-last": "off",
        "func-names": ["warn", "never", {
            "generators": "as-needed"
        }],
        "function-paren-newline": ["error", "consistent"],
        "indent": ['error', 4, {
            "SwitchCase": 1,
            "VariableDeclarator": "first",
            "outerIIFEBody": 1,
            "MemberExpression": 1,
            "FunctionDeclaration": {
                "parameters": 1,
                "body": 1
            },
            "FunctionExpression": {
                "parameters": 1,
                "body": 1
            },
            "CallExpression": {
                "arguments": 1
            },
            "ArrayExpression": 1,
            "ObjectExpression": 1,
            "ImportDeclaration": 1,
            "flatTernaryExpressions": false,
            "ignoredNodes": ['JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
            "ignoreComments": false
        }],
        "key-spacing": ["error", {
            "beforeColon": false,
            "afterColon": true,
            "mode": "strict"
        }],
        "max-len": ["error", {
            "code": 160,
            "tabWidth": 4,
            "ignoreUrls": true,
            "ignoreComments": false,
            "ignoreRegExpLiterals": true,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true,
        }],
        "new-parens": "off",
        "newline-per-chained-call": ["error", {
            "ignoreChainWithDepth": 4
        }],
        "no-lonely-if": "off",
        "no-restricted-syntax": "off",
        "object-curly-newline": ["error", {
            "ObjectExpression": {
                // "minProperties": 4,
                "multiline": true,
                "consistent": true
            },
            "ObjectPattern": "never",
            "ImportDeclaration": "never",
            "ExportDeclaration": {
                // "minProperties": 4,
                "multiline": true,
                "consistent": true
            },
        }],
        "object-property-newline": ["error", {
            "allowAllPropertiesOnSameLine": true,
        }],
        "space-before-blocks": ["error", {
            "functions": "never",
            "keywords": "always",
            "classes": "always"
        }],
        "space-before-function-paren": ["error", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }],
        /** airbnb-base: es6 */
        "no-duplicate-imports": ["error", {
            "includeExports": false
        }],
        "template-curly-spacing": ["error", "never"],
        /** plugin:vue/recommended */
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": false,
            "ignores": []
        }],
        "vue/html-self-closing": ["off"],
        "vue/max-attributes-per-line": ["warn", {
            "singleline": 3,
            "multiline": {
                "max": 3,
                "allowFirstLine": true
            }
        }],
        "vue/component-name-in-template-casing": ["error", "kebab-case", {
            "ignores": []
        }],
        "vue/script-indent": ["error", 4, {
            "baseIndent": 0,
            "switchCase": 1,
            "ignores": []
        }],
        // This rule disallows if statements as the only statement in else blocks.
        "no-lonely-if": "off",

        "no-restricted-syntax": "off",

        // 當 noSQL 來的資料，系統產生的資訊都會是底線開頭
        "no-underscore-dangle": ["off"],
        "vue/prop-name-casing": ["off"],
    },
    "overrides": [
        {
            "files": ["*.vue"],
            "rules": {
                "indent": "off"
            }
        }
    ]
}