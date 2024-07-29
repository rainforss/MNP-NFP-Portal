import useSWR from "swr";
import { msnfp_Designation } from "../dataverse-types/entities/msnfp_Designation";
import { fetcher } from "../utils/dataFetcher";

export const useDesignations = () => {
  const { data, error, mutate } = useSWR(`/api/designation`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    designations: data as msnfp_Designation[],
    isLoading: !error && !data,
    isError: error,
    mutateDesignations: mutate,
  };
};
