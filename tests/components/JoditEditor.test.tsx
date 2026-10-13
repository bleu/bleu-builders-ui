import React from "react";
import { render, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import JoditEditor from "#/components/RichTextEditor/JoditEditor";

const { make } = vi.hoisted(() => ({ make: vi.fn() }));

vi.mock("jodit/es2018/jodit.fat.min", () => ({
  Jodit: {
    make,
    modules: {
      Helpers: { isFunction: (value) => typeof value === "function" },
    },
  },
}));

it("initializes in the browser, updates content, and destroys the editor on unmount", async () => {
  const events = { on: vi.fn(), off: vi.fn() };
  events.on.mockReturnValue(events);
  events.off.mockReturnValue(events);
  const editor = {
    value: "",
    isReady: true,
    events,
    destruct: vi.fn(),
  };
  make.mockReturnValue(editor);
  const editorRef = vi.fn();
  const onBlur = vi.fn();
  const config = { readonly: false };
  const { rerender, unmount } = render(
    <JoditEditor
      config={config}
      editorRef={editorRef}
      name="content"
      onBlur={onBlur}
      value="Initial content"
    />
  );

  await waitFor(() => expect(editorRef).toHaveBeenCalledWith(editor));
  expect(make).toHaveBeenCalledWith(
    expect.objectContaining({ tagName: "TEXTAREA", name: "content" }),
    config
  );
  expect(editor.value).toBe("Initial content");

  rerender(
    <JoditEditor
      config={config}
      editorRef={editorRef}
      name="content"
      onBlur={onBlur}
      value="Updated content"
    />
  );
  expect(editor.value).toBe("Updated content");
  const blurHandler = events.on.mock.calls.find(
    ([name]) => name === "blur"
  )?.[1];
  blurHandler();
  expect(onBlur).toHaveBeenCalledWith("Updated content", undefined);

  unmount();
  expect(editor.destruct).toHaveBeenCalledOnce();
});
