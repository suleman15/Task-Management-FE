import { useMutation } from "@tanstack/react-query";
import { axiosRequest } from "./axiosInstance";
import { RegisterSchema } from "@/schemas/auth.schema";
import { toast } from "sonner";
import { ResType } from "@/types";
import { useNavigate } from "@tanstack/react-router";

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: RegisterSchema) => {
      console.log(data);
      return axiosRequest({
        url: "api/auth/register",
        data: data,
        method: "POST",
      });
    },
    onSuccess: async (data: ResType) => {
      console.log("SUCCESS BLOCK", data);
      toast.success(data?.message);
      navigate({ to: "/login" });
    },
    onError: (error: ResType) => {
      toast.error(error?.message);
    },
  });
};
