module.exports = {
  roots: ["<rootDir>/src"],
  testRegex: "(test|spec)\\.(tsx?)$",
  moduleFileExtensions: ["js", "ts", "tsx"],
  moduleNameMapper: {
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@design(.*)$": "<rootDir>/src/design$1",
    "^@store(.*)$": "<rootDir>/src/store$1",
    "\\.module.(sass|scss)$": "identity-obj-proxy",
  }
}