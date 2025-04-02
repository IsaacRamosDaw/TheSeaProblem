export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/"], // Adjust for your monorepo structure
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
};
