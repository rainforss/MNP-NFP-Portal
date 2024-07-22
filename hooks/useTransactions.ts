import useSWR from "swr";
import { fetcher } from "../utils/dataFetcher";
import { msnfp_Transaction } from "../dataverse-types/entities/msnfp_Transaction";

export const useTransactions = (contactId?: string, transactionId?: string) => {
  const { data, error, mutate } = useSWR(
    contactId
      ? `/api/contact/${contactId}/transactions`
      : transactionId
      ? `/api/transactions/${transactionId}`
      : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (!!contactId) {
    return {
      transactions: data as msnfp_Transaction[],
      isLoading: !error && !data,
      isError: error,
      mutateTransactions: mutate,
    };
  }

  return {
    transactions: data as msnfp_Transaction,
    isLoading: !error && !data,
    isError: error,
    mutateTransactions: mutate,
  };
};
