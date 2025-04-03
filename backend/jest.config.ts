import baseConfig from "../jest.config";

export default {
  ...baseConfig,
  roots: ["<rootDir>"],
  moduleNameMapper: {
    "^@/shared/(.*)$": "<rootDir>/../shared/$1", // Go up one level to access the shared directory
  },
};
