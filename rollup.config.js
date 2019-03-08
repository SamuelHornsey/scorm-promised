// rollup.config.js
import typescript from "rollup-plugin-typescript";

const esm = {
  input: "lib/index.ts",
  output: {
    file: "dist/scorm.mjs",
    format: "esm"
  },
  plugins: [
    typescript(),
  ]
};

export default [ esm ];
