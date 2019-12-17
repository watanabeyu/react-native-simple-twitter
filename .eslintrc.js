module.exports = {
  "parser": "@typescript-eslint/parser",
  "env": {
    "es6": true,
    "browser": true,
    "jest": true
  },
  "extends": [
    "airbnb",
  ],
  "globals": {
    "__DEV__": true
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "settings": {
    "import/extensions": [
      ".js",
      ".jsx",
      ".ts",
      ".tsx"
    ],
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
    camelcase: [
      "error",
      {
        allow: [
          "^oauth_",
          "^include_",
          "^default_profile",
          "^profile_",
          "^withheld_",
          "_count$",
          "_url$",
          "skip_status",
          "screen_name",
          "user_id",
          "created_at",
          "id_str"
        ]
      }
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    'react/jsx-props-no-spreading': ['error', {
      html: 'enforce',
      custom: 'ignore',
      exceptions: [],
    }],
    "max-len": [
      1,
      140,
      2
    ],
    "jsx-a11y/label-has-for": [2, {
      "required": {
        "some": ["nesting", "id"]
      }
    }],
    "react/prop-types": [
      0
    ],
    "react/destructuring-assignment": 0,
    "react/jsx-one-expression-per-line": [
      0,
      {
        "allow": "literal"
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
    "import/extensions": [
      "error", "always",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ]
  }
}