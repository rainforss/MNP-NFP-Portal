import useSWR from "swr";
import { fetcher } from "../utils/dataFetcher";

export const useCurrentUser = () => {
  const { data, error, mutate } = useSWR("/api/user", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutateUser: mutate,
  };
};
