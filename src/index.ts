import { useEffect, useState } from "react";
import { FetcherInit, UseDELETEOptions, UseGETOptions, UsePATCHOptions, UsePOSTOptions } from "./types";

class Fetcher {
  baseUrl: string;
  headers?: () => { [key: string]: string };

  constructor(baseUrl: string, headers?: () => { [key: string]: string }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  useGET<T>(url: string, opts?: UseGETOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isError, setError] = useState<{ status: number; fetchResponse: Response } | null>(null);
    const [isLoading, setLoading] = useState(false);

    const fetchData = async () => {
      setLoading(true);
      opts?.onLoadingStart?.();

      const res = await fetch(this.baseUrl + url, {
        headers: { ...this.headers?.(), ...opts?.headers },
      });

      if (res.status.toString().startsWith("2")) {
        try {
          const jsonData = await res.json();
          setData(jsonData);
          opts?.onSuccess?.(jsonData as T);
        } catch (err) {
          const text = await res.text();
          setData(text as T);
          opts?.onSuccess?.(text as T);
        }
      } else {
        setError({ status: res.status, fetchResponse: res });
        opts?.onError?.({ status: res.status, fetchResponse: res });
      }

      setLoading(false);
      opts?.onLoadingEnd?.();
    };

    useEffect(() => {
      fetchData();
    }, []);

    return { data, isError, isLoading, refetch: fetchData };
  }

  usePOST(url: string, opts?: UsePOSTOptions) {
    const [isError, setError] = useState<{ status: number; fetchResponse: Response } | null>(null);
    const [isLoading, setLoading] = useState(false);

    const postData = async (body: any) => {
      setLoading(true);
      opts?.onLoadingStart?.();

      const res = await fetch(this.baseUrl + url, {
        method: "POST",
        headers: { ...this.headers?.(), ...opts?.headers },
        body: JSON.stringify(body),
      });

      if (res.status.toString().startsWith("2")) {
        opts?.onSuccess?.();
      } else {
        setError({ status: res.status, fetchResponse: res });
        opts?.onError?.({ status: res.status, fetchResponse: res });
      }

      setLoading(false);
      opts?.onLoadingEnd?.();
    };

    return { post: postData, isError, isLoading };
  }

  useDELETE(url: string, opts?: UseDELETEOptions) {
    const [isError, setError] = useState<{ status: number; fetchResponse: Response } | null>(null);
    const [isLoading, setLoading] = useState(false);

    const deleteData = async () => {
      setLoading(true);
      opts?.onLoadingStart?.();

      const res = await fetch(this.baseUrl + url, {
        method: "DELETE",
        headers: { ...this.headers?.(), ...opts?.headers },
      });

      if (res.status.toString().startsWith("2")) {
        opts?.onSuccess?.();
      } else {
        setError({ status: res.status, fetchResponse: res });
        opts?.onError?.({ status: res.status, fetchResponse: res });
      }

      setLoading(false);
      opts?.onLoadingEnd?.();
    };

    return { isError, isLoading, delete: deleteData };
  }

  usePATCH(url: string, opts?: UsePATCHOptions) {
    const [isError, setError] = useState<{ status: number; fetchResponse: Response } | null>(null);
    const [isLoading, setLoading] = useState(false);

    const patchData = async (body: any) => {
      setLoading(true);
      opts?.onLoadingStart?.();

      const res = await fetch(this.baseUrl + url, {
        method: "PATCH",
        headers: { ...this.headers?.(), ...opts?.headers },
        body: JSON.stringify(body),
      });

      if (res.status.toString().startsWith("2")) {
        opts?.onSuccess?.();
      } else {
        setError({ status: res.status, fetchResponse: res });
        opts?.onError?.({ status: res.status, fetchResponse: res });
      }

      setLoading(false);
      opts?.onLoadingEnd?.();
    };

    return { patch: patchData, isError, isLoading };
  }
}

export const createFetcher = (opts: FetcherInit) => {
  return new Fetcher(opts.baseUrl, opts.headers);
};
