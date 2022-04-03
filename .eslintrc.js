const E = `error`;
const W = `warning`;
const O = `off`;

// eslint-disable-next-line no-undef
module.exports = {
    extends: [
        `eslint:recommended`,
        `plugin:@typescript-eslint/recommended`,
        `plugin:@typescript-eslint/eslint-recommended`,
    ],
    parser  : `@typescript-eslint/parser`,
    plugins : [`@typescript-eslint`, `arca`, `align-assignments`],
    rules   : {
        "key-spacing": [E, {
            "mode"  : `strict`,
            "align" : {
                "beforeColon" : true,
                "afterColon"  : true,
                "on"          : `colon`,
            },
        }],

        "no-trailing-spaces"                  : E,
        "align-assignments/align-assignments" : [E, { "requiresOnly": false } ],
        "no-multiple-empty-lines"             : [E, { "max": 1 }],
        "comma-dangle"                        : [E, `always-multiline`],

        // Arrow functions
        "prefer-arrow-callback" : [E, { "allowNamedFunctions": true }],
        "arrow-body-style"      : [E, `as-needed`],
        "arrow-parens"          : [E, `as-needed`],
        "arrow-spacing"         : [E, { "before": true, "after": true }],

        "semi-style"   : [E, `last`],
        "semi-spacing" : [E, { "before": false, "after": true }],

        // Overwritten by @typescript-eslint/eslint-plugin
        "quotes"               : O,
        "object-curly-spacing" : O,

        // TypeScript
        "@typescript-eslint/quotes"               : [E, `backtick`],
        "@typescript-eslint/semi"                 : [E, `always`],
        "@typescript-eslint/no-inferrable-types"  : E,
        "@typescript-eslint/no-extra-parens"      : [E, `all`],
        "@typescript-eslint/object-curly-spacing" : [E, `always`],
        "@typescript-eslint/no-unused-vars"       : [E, { "argsIgnorePattern": `_+.*` }],

        "arca/import-align": [E, { collapseExtraSpaces: true }],

        "space-in-parens" : [E, `never`],
        "indent"          : [E, 4, {
            SwitchCase               : 1,
            flatTernaryExpressions   : true,
            offsetTernaryExpressions : true,
        }],
    },
};
