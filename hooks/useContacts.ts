import useSWR from "swr";
import { fetcher } from "../utils/dataFetcher";
import { Contact } from "../dataverse-types/entities/Contact";

export const useContacts = (contactId?: string) => {
  const { data, error, mutate } = useSWR(
    contactId ? `/api/contact/${contactId}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    contact: data as Contact,
    isLoading: !error && !data,
    isError: error,
    mutateContact: mutate,
  };
};
