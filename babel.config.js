module.exports = {
  plugins: [
    [
      "module-resolver",
      {
        "root": ["./src"],
        alias: {
          "^@mb/(.+)": "./src/\\1",
        },
        "extensions": [".ios.js", ".android.js", ".js", ".json"]
      },
      "transform-decorators-legacy"
    ],
  ],
  presets: [
    "module:metro-react-native-babel-preset",
  ],
};