// @vitest-environment node
import React from "react";
import { renderToString } from "react-dom/server";
import { expect, it } from "vitest";

it("imports the package and renders the editor without browser globals", async () => {
  expect(globalThis.self).toBeUndefined();

  const { JoditEditor } = await import("../src");
  expect(renderToString(<JoditEditor value="Initial content" />)).toBe("");
});
