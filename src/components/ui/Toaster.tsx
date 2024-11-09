import React from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "#/components/ui/Toast";
import { useToast } from "#/hooks/useToast";
import { cn } from "#/lib";

function Toaster({
  className,
  position = "top-right",
}: {
  className?: string;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}) {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport className={cn(className)} position={position} />
    </ToastProvider>
  );
}

export { Toaster };
