import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosRequest } from "../axiosInstance";
import { toast } from "sonner";
import { ResType } from "@/types";
import { NewTask } from "@/schemas/task.schema";

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ids: string[]) => {
      console.log(ids);
      return axiosRequest({
        url: "api/task",
        data: { ids },
        method: "DELETE",
      });
    },
    onSuccess: async (data: ResType) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["task"],
      });
    },
    onError: (error: ResType) => {
      toast.error(error?.message);
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: NewTask) => {
      return axiosRequest({
        url: "api/task",
        data,
        method: "POST",
      });
    },
    onSuccess: async (data: ResType) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["task"],
      });
    },
    onError: (error: ResType) => {
      toast.error(error?.message);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: NewTask }) => {
      return axiosRequest({
        url: `/api/task/${id}`,
        data,
        method: "PUT",
      });
    },
    onSuccess: async (data: ResType) => {
      console.log(data);
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["task", { id: data?.data?._id }], // Include token and id in the queryKey
      });
    },
    onError: (error: ResType) => {
      toast.error(error?.message);
    },
  });
};

export const useUpdateTasks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { ids: string[]; updateData: any }) => {
      return axiosRequest({
        url: `/api/task/update`,
        data,
        method: "PUT",
      });
    },
    onSuccess: async (data: ResType) => {
      console.log(data);
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["task"], // Include token and id in the queryKey
      });
    },
    onError: (error: ResType) => {
      toast.error(error?.message);
    },
  });
};
