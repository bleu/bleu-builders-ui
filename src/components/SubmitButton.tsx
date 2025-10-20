import React from "react";
import { useNavigation } from "react-router";
import { useTranslation } from "react-i18next";
import { Button, ButtonProps } from "./ui/Button";

export interface SubmitButtonProps extends ButtonProps {
  isSubmitting?: boolean;
  submittingText?: string;
}

export const SubmitButton = React.forwardRef<
  HTMLButtonElement,
  SubmitButtonProps
>(({ isSubmitting = false, submittingText, ...props }, ref) => {
  const { state } = useNavigation();
  const { t } = useTranslation();
  const loadingText = submittingText ?? t("Loading");

  return (
    <Button
      ref={ref}
      {...props}
      loadingText={loadingText}
      loading={isSubmitting || state === "submitting"}
    />
  );
});
