import { UseQueryResult, useQueries, useQuery } from "@tanstack/react-query";
import { axiosRequest } from "../axiosInstance";
import { Task } from "@/schemas/task.schema";
import { ResType } from "@/types";

export function useTaskidQuery() {
  return useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      return axiosRequest({
        url: "api/task/array-list",
      });
    },
  });
}

export function useTaskQueries(ids: string[]): UseQueryResult<ResType<Task>>[] {
  return useQueries({
    queries: (ids ?? [])?.map((id) => {
      return {
        queryKey: ["task", { id }], // Include token and id in the queryKey
        queryFn: () => {
          return axiosRequest({
            url: `api/task/${id}`,
          });
        },
      };
    }),
  });
}

export function useAllTask() {
  return useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      return axiosRequest({
        url: "api/task/",
      });
    },
  });
}
