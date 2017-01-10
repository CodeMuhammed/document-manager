module.exports = {
    "parser":"babel-eslint",
    "env": {
        "browser": true,
        "node": true
    },
    "extends": "airbnb",
    "rules": {
       "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
       "react/prefer-stateless-function": "off",
       "no-undef": "off",
       "arrow-body-style": "off",
    }
}