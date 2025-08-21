import { useEffect } from "react";
import {UseQueryResult } from "@tanstack/react-query";

export function useRefetchOnFlag<TData = unknown, TError = Error>(
  handleRefetch: boolean,
  setHandleRefetch: React.Dispatch<React.SetStateAction<boolean>>,
  refetch: UseQueryResult<TData, TError>["refetch"]
) {
  useEffect(() => {
    if (handleRefetch) {
      void refetch();
      setHandleRefetch(false);
    }
  }, [handleRefetch, refetch, setHandleRefetch]);
}
