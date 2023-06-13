export type FetcherInit = {
  baseUrl: string;
  headers?: () => { [key: string]: string };
};

export interface StatefulErrResponse<T = any> {
  status: number;
  fetchResponse: Response | null;
  data: T;
}

export type Method = "POST" | "GET" | "DELETE" | "PATCH" | "PUT";

export type UseOptions<T = any> = {
  onSuccess?: (data: T) => void;
  onError?: ({ status, data, fetchResponse }: StatefulErrResponse) => void;
  onLoadingStart?: () => void;
  onLoadingEnd?: () => void;
  headers?: { [key: string]: string };
  method?: Method;
  params?: { [key: string]: any };
};

export type MakeRequestOptions = {
  headers?: { [key: string]: string };
  method: Method;
  body?: any;
  params?: { [key: string]: any };
};
