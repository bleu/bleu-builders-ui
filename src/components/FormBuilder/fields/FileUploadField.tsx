import { cva } from "class-variance-authority";
import React, { useCallback, useEffect, useReducer } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Trans } from "react-i18next";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/Form";
import { cn } from "#/lib/utils";

import { withConditional } from "../withConditional";
import { BaseField } from "../types";

const imageUploadVariants = cva("w-full", {
  variants: {
    size: {
      small: "size-24 p-0 max-w-24",
      medium: "size-48 p-0 max-w-48",
      large: "size-80 p-0 max-w-80",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export interface FileUploadFieldProps extends BaseField {
  accept?: string;
  download?: boolean;
  mode: "image" | "file";
  style?: {
    size?: "small" | "medium" | "large";
  };
  type: "file";
}

const initialState = {
  imagePreview: "",
  contentUploaded: false,
  downloadUrl: "",
  filename: "",
};

function fileReducer(state, action) {
  switch (action.type) {
    case "SET_FILE":
      return {
        ...state,
        contentUploaded: true,
        downloadUrl: action.downloadUrl,
        filename: action.filename,
        imagePreview: action.mode === "image" ? action.downloadUrl : "",
      };
    case "REMOVE_FILE":
      return { ...initialState };
    default:
      throw new Error();
  }
}

export const FileUploadField = withConditional<FileUploadFieldProps>(
  ({ form, field }) => {
    const [state, dispatch] = useReducer(fileReducer, initialState);

    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
      const value = form.getValues(field.name);
      if (!value) return;

      dispatch({
        type: "SET_FILE",
        downloadUrl: value,
        filename: value,
        mode: field.mode || "image",
      });
    }, []);

    const onUpload = useCallback((event) => {
      if (!event.target.files?.length) return;

      const file = event.target.files[0];
      form.setValue(field.name, file);
      const fileUrl = URL.createObjectURL(file);
      dispatch({
        type: "SET_FILE",
        downloadUrl: fileUrl,
        filename: file.name,
        mode: field.mode || "image",
      });
    }, []);

    const handleClick = () => {
      if (hiddenFileInput.current) hiddenFileInput.current.click();
    };

    const handleRemoveContent = (event) => {
      event.stopPropagation();
      form.setValue(field.name, null);
      dispatch({ type: "REMOVE_FILE" });
    };

    const handleDownload = () => {
      const link = document.createElement("a");
      link.href = state.downloadUrl;
      link.download = state.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const accept = field.accept || (field.mode === "file" ? "*" : "image/*");

    return (
      <FormField
        control={form.control}
        name={field.name}
        rules={field.required ? { required: true } : undefined}
        render={({ field: formField }) => (
          <FormItem className="w-full">
            <FormLabel tooltip={field.tooltip} required={field.required}>
              {field.label}
            </FormLabel>
            <FormDescription>{field.description}</FormDescription>
            <FormControl>
              <div className="flex flex-col gap-0 items-start">
                <div
                  className={cn(
                    "relative border-2 rounded-lg overflow-hidden border-dashed",
                    state.imagePreview
                      ? "inline-block cursor-pointer bg-cover"
                      : "w-full flex-col items-center",
                    imageUploadVariants(field.style)
                  )}
                >
                  {state.contentUploaded && (
                    <button
                      type="button"
                      className="absolute top-0 right-0 m-1 z-50"
                      onClick={handleRemoveContent}
                      aria-label="Remove File"
                    >
                      <Cross1Icon className="text-2xl font-semibold" />
                    </button>
                  )}
                  <button
                    type="button"
                    className={cn(
                      "w-full h-full flex items-center justify-center relative",
                      imageUploadVariants(field.style),
                      state.contentUploaded ? "rounded-sm p-0" : ""
                    )}
                    onClick={handleClick}
                  >
                    {state.contentUploaded ? (
                      <>
                        {state.imagePreview ? (
                          <img
                            src={state.imagePreview}
                            alt="preview"
                            className="object-contain size-full rounded-sm"
                          />
                        ) : (
                          <span className="absolute inset-0 flex items-center justify-center truncate">
                            {state.filename}
                          </span>
                        )}
                        <div className="hover:ring-primary absolute inset-0 flex items-center justify-center rounded-sm bg-black/50 opacity-0 transition-opacity hover:opacity-100 hover:ring-2 hover:ring-offset-2">
                          <span className="text-lg font-semibold text-white">
                            <Trans>Click to Upload</Trans>
                          </span>
                        </div>
                      </>
                    ) : (
                      <span className="text-lg font-semibold">
                        <Trans>Upload a file</Trans>
                      </span>
                    )}
                  </button>
                  <input
                    type="file"
                    onChange={onUpload}
                    accept={accept}
                    name={formField.name}
                    ref={hiddenFileInput}
                    style={{ display: "none" }}
                  />
                </div>
                {field.download && state.contentUploaded && (
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Trans>Download</Trans>
                  </button>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);
