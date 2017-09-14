module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
    "extends": "google",
  "rules": {
    "linebreak-style": ["error", "windows"],
    "quotes": ["off", "double"],
    "space-before-function-paren": ["error", {
      "anonymous": "always", "named": "never", "asyncArrow": "always"
    }]
  }
};