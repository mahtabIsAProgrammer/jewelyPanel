// hooks/useMutationWithAlert.ts
import { useState } from "react";
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import type { AlertColor } from "@mui/material";
import { API_URL } from "../constants/static";
import emptyImage from "../../assets/images/empty-image.webp";
import emptyImageUser from "../../assets/images/empty-image-user.webp";

interface UseMutationWithAlertOptions<TData, TError, TVariables>
  extends UseMutationOptions<TData, TError, TVariables> {
  successMessage?: string;
  errorMessage?: string;
}

export const useMutationWithAlert = <
  TData = unknown,
  TError = unknown,
  TVariables = void
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  {
    successMessage = "Action completed successfully",
    errorMessage = "Something went wrong",
    ...options
  }: UseMutationWithAlertOptions<TData, TError, TVariables>
): [
  UseMutationResult<TData, TError, TVariables>,
  { open: boolean; message: string; severity: AlertColor; close: () => void }
] => {
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const mutation = useMutation<TData, TError, TVariables>({
    mutationFn,
    ...options,
    onSuccess: (data, variables, context) => {
      setAlert({ open: true, message: successMessage, severity: "success" });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      setAlert({ open: true, message: errorMessage, severity: "error" });
      options?.onError?.(error, variables, context);
    },
  });

  return [
    mutation,
    { ...alert, close: () => setAlert((prev) => ({ ...prev, open: false })) },
  ];
};

export const localNavigateHandler = (path: string) => {
  if (!path.startsWith("/")) location.pathname = location.pathname + "/" + path;
  else location.assign(path);
};

export const handleImageUrl = (imagePath?: string, isUser?: boolean) => {
  if (!imagePath) return isUser ? emptyImageUser : emptyImage;

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  if (!imagePath.startsWith("/")) imagePath = `/${imagePath}`;

  if (!imagePath.includes("/")) {
    return `${API_URL}${imagePath}`;
  }

  return `${API_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};
