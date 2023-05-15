import { useEffect, useState } from "react";
import { FetcherInit, UseGETOptions, UsePOSTOptions } from "./types";

class Fetcher {
  baseUrl: string;
  headers?: () => { [key: string]: string };

  constructor(baseUrl: string, headers?: () => { [key: string]: string }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  useGET<T>(urlPathname: string, opts?: UseGETOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isError, setError] = useState<{ status: number; fetchResponse: Response } | null>(null);
    const [isLoading, setLoading] = useState(false);

    const fetchData = async () => {
      setLoading(true);
      opts?.onLoadingStart();

      const res = await fetch(this.baseUrl + urlPathname, {
        headers: { ...this.headers?.(), ...opts?.headers },
      });
      try {
        const jsonData = await res.json();
        setData(jsonData);
      } catch (e) {
        setError({ status: res.status, fetchResponse: res });
      }

      setLoading(false);
      opts?.onLoadingEnd();
    };

    useEffect(() => {
      fetchData();
    }, []);

    return { data, isError, isLoading, refetch: fetchData };
  }

  usePOST<T>(urlPathname: string, opts?: UsePOSTOptions) {
    const [isError, setError] = useState<{ status: number; fetchResponse: Response } | null>(null);
    const [isLoading, setLoading] = useState(false);

    const postData = async (body: T) => {
      setLoading(true);
      opts?.onLoadingStart();

      const res = await fetch(this.baseUrl + urlPathname, {
        method: "POST",
        headers: { ...this.headers?.(), ...opts?.headers },
        body: JSON.stringify(body),
      });

      if (res.status.toString().startsWith("2")) {
        opts?.onSuccess();
      } else {
        setError({ status: res.status, fetchResponse: res });
        opts?.onError({ status: res.status, fetchResponse: res });
      }

      setLoading(false);
      opts?.onLoadingEnd();
    };

    return { post: postData, isError, isLoading };
  }
}

export const createFetcher = (opts: FetcherInit) => {
  return new Fetcher(opts.baseUrl, opts.headers);
};
