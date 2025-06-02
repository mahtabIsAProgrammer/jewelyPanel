import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../configs/api";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => undefined,
    onError: (err) => console.log("Login failed" + err),
  });
};
