// @ts-nocheck
/* eslint-disable */
import React, {
  useEffect,
  useRef,
  forwardRef,
  useLayoutEffect,
  useCallback,
} from "react";
import "jodit/es5/jodit.min.css";
import "./styles.css";
import { Jodit } from "jodit/es2018/jodit.fat.min";

const { isFunction } = Jodit.modules.Helpers;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

interface JoditEditorProps {
  className?: string;
  config?: DeepPartial<Jodit["options"]>;
  editorRef?: (editor: Jodit) => void;
  id?: string;
  name?: string;
  onBlur?: (newValue: string) => void;
  onChange?: (newValue: string) => void;
  tabIndex?: number;
  value: string;
  isUploading?: boolean;
}

const JoditEditorBase = forwardRef<HTMLTextAreaElement, JoditEditorProps>(
  (
    {
      className,
      config,
      id,
      name,
      onBlur,
      onChange,
      tabIndex,
      value,
      editorRef,
      isUploading = false,
    },
    ref
  ) => {
    const textArea = useRef(null);

    useLayoutEffect(() => {
      if (ref) {
        if (isFunction(ref)) {
          ref(textArea.current);
        } else {
          ref.current = textArea.current;
        }
      }
    }, [textArea, ref]);

    useEffect(() => {
      const element = textArea.current;
      const jodit = Jodit.make(element, config);
      textArea.current = jodit;

      if (editorRef && typeof editorRef === "function") {
        editorRef(jodit);
      }

      return () => {
        if (jodit) {
          jodit.destruct();
        }

        textArea.current = element;
      };
    }, [config, editorRef]);

    const preClassName = usePrevious(className);

    useEffect(() => {
      const classList = textArea.current?.container?.classList;

      if (preClassName !== className && typeof preClassName === "string") {
        preClassName.split(/\s+/).forEach((cl) => classList?.remove(cl));
      }

      if (className && typeof className === "string") {
        className.split(/\s+/).forEach((cl) => classList?.add(cl));
      }
    }, [className, preClassName]);

    useEffect(() => {
      if (textArea.current.workplace) {
        textArea.current.workplace.tabIndex = tabIndex || -1;
      }
    }, [tabIndex]);

    const onBlurHandler = useCallback(
      (e) => onBlur && onBlur(textArea.current.value, e),
      [onBlur, textArea.current]
    );
    const onChangeHandler = useCallback(
      (value: string) => onChange && onChange(value),
      [onChange]
    );

    useEffect(() => {
      if (!textArea.current.events || (!onBlur && !onChange)) {
        return;
      }

      // adding event handlers
      textArea.current.events
        .on("blur", onBlurHandler)
        .on("change", onChangeHandler);

      return () => {
        // Remove event handlers
        textArea.current?.events
          ?.off("blur", onBlurHandler)
          .off("change", onChangeHandler);
      };
    }, [onBlur, onChange]);

    useEffect(() => {
      const updateValue = () => {
        if (textArea.current && textArea?.current?.value !== value) {
          textArea.current.value = value;
        }
      };

      if (textArea.current) {
        textArea.current.isReady
          ? updateValue()
          : textArea.current.waitForReady().then(updateValue);
      }
    }, [value]);

    return (
      <div className="jodit-react-container">
        <textarea defaultValue={value} name={name} id={id} ref={textArea} />
        {isUploading && (
          <div className="jodit-loading-overlay">
            <div className="jodit-loading-spinner" />
          </div>
        )}
      </div>
    );
  }
);

const JoditEditor = React.memo(JoditEditorBase);

export default JoditEditor;
