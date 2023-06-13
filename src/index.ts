import { useEffect, useState } from "react";
import {
  ErrResponse,
  FetcherInit,
  MakeRequestOptions,
  StatefulErrResponse,
  UseDELETEOptions,
  UseGETOptions,
  UseOptions,
  UsePATCHOptions,
  UsePOSTOptions,
} from "./types";
import { getCleanUrl } from "./utils/urls";

type ResponseError = ErrResponse | null;
type StatefulResponseError<T = any> = StatefulErrResponse<T> | null;

class Fetcher {
  baseUrl: string;
  headers?: () => { [key: string]: string };

  defaultRequestOps: MakeRequestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: undefined,
    params: {}
  };

  constructor(baseUrl: string, headers?: () => { [key: string]: string }) {
    this.baseUrl = getCleanUrl(baseUrl);
    this.headers = () => ({
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers?.(),
    });
  }

  async request<T>(url: string, opts = this.defaultRequestOps) {
    let data: T | null = null;
    let error: StatefulResponseError = null;

    let res: Response;
    let resData: any;

    let requestUrl = new URL(this.baseUrl + url)

    if (Object.keys(opts.params || {}).length > 0) {
      requestUrl.search = new URLSearchParams(opts.params).toString()
    }

    Array.from(requestUrl.searchParams)

    try {
      res = await fetch(requestUrl, {
        headers: { ...this.headers?.(), ...opts?.headers },
        method: opts?.method,
        body: opts?.body && opts?.method !== "GET" ? JSON.stringify(opts?.body) : undefined,
      });
    } catch (err) {
      console.error(err);
      error = { status: 0, fetchResponse: null, data: null };
      return { data, error };
    }

    const textRes = await res.text();

    try {
      resData = textRes ? JSON.parse(textRes) : null;
    } catch (err) {
      resData = textRes;
    }

    if (res.ok) {
      data = resData as T;
    } else {
      error = { status: res.status, fetchResponse: res, data: resData };
    }

    return { data, error };
  }

  useQuery<T>(url: string, opts?: UseOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<StatefulResponseError>(null);
    const [isLoading, setLoading] = useState(true);

    const query = async (params: { [key: string]: string } = {}) => {
      setLoading(true);
      opts?.onLoadingStart?.();

      const { data, error } = await this.request<T>(url, {
        headers: opts?.headers,
        method: opts?.method || "GET",
        params,
      });

      setLoading(false);
      opts?.onLoadingEnd?.();

      if (error) {
        setError(error);
        opts?.onError?.({ status: error.status, fetchResponse: error.fetchResponse, data });
      } else if (data) {
        setData(data);
        opts?.onSuccess?.(data);
      } else console.log("No data or error returned from request!");

      return { data, error };
    };

    useEffect(() => {
      query();
    }, []);

    return { data, error, refetch: query, isLoading, isError: !!error };
  }

  useMutation<T>(url: string, opts?: UseOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<StatefulResponseError>(null);
    const [isLoading, setLoading] = useState(true);

    const mutate = async (body: any, params?: { [key: string]: string }) => {
      setLoading(true);
      opts?.onLoadingStart?.();

      const { data, error } = await this.request<T>(url, {
        body,
        headers: opts?.headers,
        method: opts?.method || "POST",
        params
      });

      setLoading(false);
      opts?.onLoadingEnd?.();

      if (error) {
        setError(error);
        opts?.onError?.({ status: error.status, fetchResponse: error.fetchResponse, data });
      } else if (data) {
        setData(data);
        opts?.onSuccess?.(data);
      } else console.log("No data or error returned from request!");

      return { data, error };
    };

    return { data, error, mutate, isLoading, isError: !!error };
  }

  useGET<T>(url: string, opts?: UseGETOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isError, setError] = useState<ResponseError>(null);
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
    const [isError, setError] = useState<ResponseError>(null);
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
    const [isError, setError] = useState<ResponseError>(null);
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
    const [isError, setError] = useState<ResponseError>(null);
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
