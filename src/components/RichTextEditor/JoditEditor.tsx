import React, { forwardRef, lazy, Suspense, useEffect, useState } from "react";
import type { JoditEditorProps } from "./JoditEditorClient";

const JoditEditorClient = lazy(() => import("./JoditEditorClient"));

const JoditEditor = forwardRef<HTMLTextAreaElement, JoditEditorProps>(
  (props, ref) => {
    const [mounted, setMounted] = useState(false);

    // Jodit reads browser globals at import time, so load it after mounting.
    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
      <Suspense fallback={null}>
        <JoditEditorClient {...props} ref={ref} />
      </Suspense>
    );
  }
);

JoditEditor.displayName = "JoditEditor";

export default React.memo(JoditEditor);
