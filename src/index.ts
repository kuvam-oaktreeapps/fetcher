import { useEffect, useState } from "react";
import type { FetcherInit, MakeRequestOptions, StatefulErrResponse, UseOptions } from "./types";
import { getCleanUrl, getSlashedUrl } from "./utils/urls";

type StatefulResponseError<T = any> = null | StatefulErrResponse<T>;

class Fetcher {
  baseUrl: string;
  headers?: () => { [key: string]: string };

  constructor(baseUrl?: string, headers?: () => { [key: string]: string }) {
    this.baseUrl = getCleanUrl(baseUrl || "/");
    this.headers = () => ({
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers?.(),
    });
  }

  async request<T>(url: string, opts: MakeRequestOptions = {}) {
    const requestInfo: MakeRequestOptions = {
      method: opts.method || "GET",
      body: JSON.stringify(opts.body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...this.headers?.(),
        ...opts?.headers,
      },
    };

    let data: T | null = null;
    let error: StatefulResponseError = null;

    let res: Response;
    let resData: any;

    let requestUrl = this.baseUrl + url;

    if (Object.keys(opts.params || {}).length > 0) {
      requestUrl += new URLSearchParams(opts.params).toString();
    }

    try {
      res = await fetch(requestUrl, requestInfo);
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

    const query = async (params: { [key: string]: any } = {}) => {
      setLoading(true);
      opts?.onLoadingStart?.();

      const { data, error } = await this.request<T>(getSlashedUrl(url), {
        headers: opts?.headers,
        method: opts?.method,
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
      query(opts?.params);
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

      const { data, error } = await this.request<T>(getSlashedUrl(url), {
        body,
        headers: opts?.headers,
        method: opts?.method || "POST",
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

    return { data, error, mutate, isLoading, isError: !!error };
  }
}

export const createFetcher = (opts?: FetcherInit) => {
  return new Fetcher(opts?.baseUrl, opts?.headers);
};
