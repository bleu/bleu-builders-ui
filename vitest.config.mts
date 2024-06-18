import { defineConfig as viteDefineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { defineConfig, mergeConfig } from "vitest/config";
import path from "path";

export default mergeConfig(
  viteDefineConfig({
    plugins: [
      react(),
      viteIgnoreStaticImport(["jodit-react", "react-plotly.js"]),
    ],
  }),
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./tests/setup.ts",
      passWithNoTests: true,
    },
    resolve: {
      alias: {
        "#": path.resolve(__dirname, "./src"),
        tests: path.resolve(__dirname, "./tests"),
      },
    },
  })
);

function viteIgnoreStaticImport(importKeys) {
  return {
    name: "vite-plugin-ignore-static-import",
    enforce: "pre" as const,
    // 1. insert to optimizeDeps.exclude to prevent pre-transform
    config(config) {
      config.optimizeDeps = {
        ...(config.optimizeDeps ?? {}),
        exclude: [...(config.optimizeDeps?.exclude ?? []), ...importKeys],
      };
    },
    // 2. push a plugin to rewrite the 'vite:import-analysis' prefix
    configResolved(resolvedConfig) {
      const VALID_ID_PREFIX = `/@id/`;
      const reg = new RegExp(
        `${VALID_ID_PREFIX}(${importKeys.join("|")})`,
        "g"
      );
      resolvedConfig.plugins.push({
        name: "vite-plugin-ignore-static-import-replace-idprefix",
        transform: (code) =>
          reg.test(code) ? code.replace(reg, (m, s1) => s1) : code,
      });
    },
    // 3. rewrite the id before 'vite:resolve' plugin transform to 'node_modules/...'
    resolveId: (id) => {
      if (importKeys.includes(id)) {
        return { id, external: true };
      }
    },
  };
}
