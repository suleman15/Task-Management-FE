import { useMutation } from "@tanstack/react-query";
import { axiosRequest } from "../axiosInstance";
import { LoginSchema } from "@/schemas/auth.schema";
import { toast } from "sonner";
import { ResType } from "@/types";
import { useUserStore } from "@/store/user.store";

export const useLoginMutation = () => {
  const user = useUserStore();

  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      console.log(data);
      return axiosRequest({
        url: "api/auth/login",
        data: data,
        method: "POST",
      });
    },
    onSuccess: async (data: ResType) => {
      console.log("SUCCESS", data);
      user.login(data?.data);
    },
    onError: (error: ResType) => {
      toast.error(error?.message);
    },
  });
};
