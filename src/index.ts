import { useEffect, useState } from "react";
import { FetcherInit, UseDELETEOptions, UseGETOptions, UsePATCHOptions, UsePOSTOptions } from "./types";

type ResponseError = { status: number; fetchResponse: Response } | null;

class Fetcher {
  baseUrl: string;
  headers?: () => { [key: string]: string };

  constructor(baseUrl: string, headers?: () => { [key: string]: string }) {
    this.baseUrl = baseUrl;
    this.headers = () => ({
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers?.(),
    });
  }

  useGET<T>(url: string, opts?: UseGETOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isError, setError] = useState<{ status: number; fetchResponse: Response } | null>(null);
    const [isLoading, setLoading] = useState(true);

    const fetchData = async () => {
      let data: T | null = null;
      let error: ResponseError = null;

      setLoading(true);
      opts?.onLoadingStart?.();

      const res = await fetch(this.baseUrl + url, {
        headers: { ...this.headers?.(), ...opts?.headers },
      });

      if (res.status.toString().startsWith("2")) {
        try {
          data = await res.json();
          setData(data);
          opts?.onSuccess?.(data as T);
        } catch (err) {
          data = (await res.text()) as any;
          setData(data as T);
          opts?.onSuccess?.(data as T);
        }
      } else {
        error = { status: res.status, fetchResponse: res };
        setError(error);
        opts?.onError?.(error);
      }

      setLoading(false);
      opts?.onLoadingEnd?.();

      return { data, error };
    };

    useEffect(() => {
      fetchData();
    }, []);

    return { data, isError, isLoading, refetchData: fetchData };
  }

  usePOST<T>(url: string, opts?: UsePOSTOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isError, setError] = useState<{ status: number; fetchResponse: Response } | null>(null);
    const [isLoading, setLoading] = useState(false);

    const postData = async (body: any) => {
      let data: T | null = null;
      let error: ResponseError = null;

      setLoading(true);
      opts?.onLoadingStart?.();

      const res = await fetch(this.baseUrl + url, {
        method: "POST",
        headers: { ...this.headers?.(), ...opts?.headers },
        body: JSON.stringify(body),
      });

      if (res.status.toString().startsWith("2")) {
        try {
          data = await res.json();
          setData(data);
          opts?.onSuccess?.(data as T);
        } catch (err) {
          data = (await res.text()) as any;
          setData(data as T);
          opts?.onSuccess?.(data as T);
        }
      } else {
        error = { status: res.status, fetchResponse: res };
        setError(error);
        opts?.onError?.(error);
      }

      setLoading(false);
      opts?.onLoadingEnd?.();

      return { data, error };
    };

    return { postData, isError, isLoading, data };
  }

  useDELETE<T>(opts?: UseDELETEOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isError, setError] = useState<{ status: number; fetchResponse: Response } | null>(null);
    const [isLoading, setLoading] = useState(false);

    const deleteData = async (url: string) => {
      let data: T | null = null;
      let error: ResponseError = null;

      setLoading(true);
      opts?.onLoadingStart?.();

      const res = await fetch(this.baseUrl + url, {
        method: "DELETE",
        headers: { ...this.headers?.(), ...opts?.headers },
      });

      if (res.status.toString().startsWith("2")) {
        try {
          data = await res.json();
          setData(data);
          opts?.onSuccess?.(data as T);
        } catch (err) {
          data = (await res.text()) as any;
          setData(data as T);
          opts?.onSuccess?.(data as T);
        }
      } else {
        error = { status: res.status, fetchResponse: res };
        setError(error);
        opts?.onError?.(error);
      }

      setLoading(false);
      opts?.onLoadingEnd?.();

      return { data, error };
    };

    return { isError, isLoading, deleteData, data };
  }

  usePATCH<T>(opts?: UsePATCHOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isError, setError] = useState<{ status: number; fetchResponse: Response } | null>(null);
    const [isLoading, setLoading] = useState(false);

    const patchData = async (url: string, body: any) => {
      let data: T | null = null;
      let error: ResponseError = null;

      setLoading(true);
      opts?.onLoadingStart?.();

      const res = await fetch(this.baseUrl + url, {
        method: "PATCH",
        headers: { ...this.headers?.(), ...opts?.headers },
        body: JSON.stringify(body),
      });

      if (res.status.toString().startsWith("2")) {
        try {
          const data = await res.json();
          setData(data);
          opts?.onSuccess?.(data as T);
        } catch (err) {
          data = (await res.text()) as any;
          setData(data as T);
          opts?.onSuccess?.(data as T);
        }
      } else {
        error = { status: res.status, fetchResponse: res };
        setError(error);
        opts?.onError?.(error);
      }

      setLoading(false);
      opts?.onLoadingEnd?.();

      return { data, error };
    };

    return { patchData, isError, isLoading, data };
  }
}

export const createFetcher = (opts: FetcherInit) => {
  return new Fetcher(opts.baseUrl, opts.headers);
};
