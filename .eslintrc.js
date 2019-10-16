module.exports = {
  "parser": "@typescript-eslint/parser",
  "env": {
    "es6": true,
    "browser": true,
    "jest": true
  },
  "extends": "airbnb",
  "globals": {
    "__DEV__": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    }
  },
  "rules": {
    "max-len": [
      1,
      140,
      2
    ],
    camelcase: [
      "error",
      {
        allow: [
          "^oauth_",
          "include_entities",
          "skip_status",
          "include_email"
        ]
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": ["src/**", "__tests__/**"],
        "optionalDependencies": false,
        "peerDependencies": false
      }
    ],
    "react/jsx-props-no-spreading": 0,
    "react/jsx-filename-extension": [
      "error",
      {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    ],
    "react/destructuring-assignment": [0]
  }
}