import useSWR from "swr";
import { fetcher } from "../utils/dataFetcher";

export const useDocuments = (name: string, recordId?: string) => {
  const { data, error, mutate } = useSWR(
    recordId ? `/api/${name}/${recordId}/documents` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    documents: data,
    isLoading: !error && !data,
    isError: error,
    mutateDocuments: mutate,
  };
};
