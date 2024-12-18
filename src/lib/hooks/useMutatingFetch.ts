import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import handleServerError from "../server-error-handle";
import { toast } from "react-hot-toast";

type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

type FetchCallback<T = any> = (data: T) => void;

export const useMutatingFetch = (onSuccess?: () => void) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const isMutating = isFetching || isPending;

  const doFetch = async <T = any>(
    url: string,
    options: FetchOptions = {},
    callback?: FetchCallback<T>,
    onFinally?: () => void,
    onError?: (err: Error) => void,
  ) => {
    setIsFetching(true);
    setError(null);

    try {
      // Default headers for JSON
      const defaultHeaders = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers: defaultHeaders,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Response status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        handleServerError(data.error);
        throw new Error(data.error);
      }

      callback?.(data);
      onSuccess?.();

      return data;
    } catch (error) {
      const processedError =
        error instanceof Error ? error : new Error(String(error));

      setError(processedError);
      onError?.(processedError);

      toast.error(
        processedError.message ||
          "Something went wrong, please try again later.",
      );
      console.error("An error occurred:", processedError);
    } finally {
      setIsFetching(false);

      startTransition(() => {
        router.refresh();
        onFinally?.();
      });
    }
  };

  return {
    isMutating,
    doFetch,
    error,
  };
};

// import { useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import handleServerError from "../server-error-handle";
// import { toast } from "react-hot-toast";

// type FetchCallback = (data: any) => void;

// export const useMutatingFetch = (onSuccess?: () => void) => {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();
//   const [isFetching, setIsFetching] = useState(false);
//   const isMutating = isFetching || isPending;

//   const doFetch = async (
//     url: string,
//     options: object,
//     callback?: FetchCallback,
//     onFinally?: () => void,
//     onError?: () => void,
//   ) => {
//     setIsFetching(true);

//     try {
//       const response = await fetch(url, options);
//       const data = await response.json();

//       console.log(data, "the dataaaaaa");

//       if (data.error) {
//         handleServerError(data.error);
//       } else {
//         if (callback) {
//           callback(data);
//         }

//         if (onSuccess) {
//           onSuccess();
//         }
//       }
//     } catch (error) {
//       toast.error("Something went wrong, please try again later.");
//       console.error("An error occurred:", error);
//     }

//     setIsFetching(false);

//     startTransition(() => {
//       router.refresh();
//       if (onFinally) {
//         onFinally();
//       }
//     });
//   };

//   return {
//     isMutating,
//     doFetch,
//   };
// };
