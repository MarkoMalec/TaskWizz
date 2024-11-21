import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import handleServerError from "../server-error-handle";
import { toast } from "react-hot-toast";

type FetchCallback = (data: any) => void;

export const useMutatingFetch = (onSuccess?: () => void) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  const doFetch = async (
    url: string,
    options: object,
    callback?: FetchCallback,
    onFinally?: () => void,
    onError?: () => void,
  ) => {
    setIsFetching(true);

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      console.log(data, "the dataaaaaa");

      if (data.error) {
        handleServerError(data.error);
      } else {
        if (callback) {
          callback(data);
        }

        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
      console.error("An error occurred:", error);
    }

    setIsFetching(false);

    startTransition(() => {
      router.refresh();
      if (onFinally) {
        onFinally();
      }
    });
  };

  return {
    isMutating,
    doFetch,
  };
};
