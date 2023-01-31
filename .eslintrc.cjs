module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "canonical",
    "canonical/react",
    "canonical/typescript",
    // "canonical/jest",
    "canonical/prettier"
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ['prettier'],
  "rules": {
    "@typescript-eslint/no-non-null-assertion": "off"
  }
};
