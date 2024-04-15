import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { cn } from "#/lib/utils";
import { Label } from "#/components/ui/Label";
import { useRailsApp } from "../RailsApp/context";
import { Tooltip } from ".";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const Form = ({
  children,
  className = "",
  action = undefined,
  method = undefined,
  onSubmit = () => {},
  encType = "application/x-www-form-urlencoded",
  ...props
}: {
  action?: string;
  children: React.ReactNode;
  className?: string;
  encType?: "application/x-www-form-urlencoded" | "multipart/form-data";
  method?: "get" | "post";
  onSubmit?: React.FormEventHandler<HTMLFormElement> | (() => void);
}) => {
  const { csrfToken } = useRailsApp();

  return (
    // @ts-expect-error TS(2740) FIXME: Type '{ children: Element; }' is missing the follo... Remove this comment to see the full error message
    <FormProvider {...props}>
      <form
        action={action}
        method={method}
        className={className}
        encType={encType}
        onSubmit={onSubmit}
      >
        {children}
        {csrfToken && (
          <input type="hidden" name="authenticity_token" value={csrfToken} />
        )}
      </form>
    </FormProvider>
  );
};
const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
);

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  <FormItemContext.Provider value={{ id: React.useId() }}>
    <div ref={ref} className={cn("space-y-2", className)} {...props} />
  </FormItemContext.Provider>
));
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    tooltip?: string;
  }
>(({ className, tooltip, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Tooltip content={tooltip}>
      <div className="flex items-center gap-x-2">
        <Label
          ref={ref}
          className={cn(error && "text-destructive", className)}
          htmlFor={formItemId}
          {...props}
        />
        {tooltip && <InfoCircledIcon />}
      </div>
    </Tooltip>
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-destructive text-sm font-medium", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
