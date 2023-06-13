export type FetcherInit = {
  baseUrl: string;
  headers?: () => { [key: string]: string };
};

export interface ErrResponse {
  status: number;
  fetchResponse: Response | null;
}

export interface StatefulErrResponse<T = any> extends ErrResponse {
  data: T;
}

export type Method = "POST" | "GET" | "DELETE" | "PATCH" | "PUT";

export type UseOptions<R = any> = {
  onSuccess?: (data: R) => void;
  onError?: ({ status, data, fetchResponse }: StatefulErrResponse) => void;
  onLoadingStart?: () => void;
  onLoadingEnd?: () => void;
  headers?: { [key: string]: string };
  method?: Method;
  params?: { [key: string]: any };
};

export type UseGETOptions<T = any> = {
  onSuccess?: (data: T) => void;
  onError?: ({ status, fetchResponse }: ErrResponse) => void;
  onLoadingStart?: () => void;
  onLoadingEnd?: () => void;
  headers?: { [key: string]: string };
};

export type UsePOSTOptions<T = any> = {
  onSuccess?: (data: T) => void;
  onError?: ({ status, fetchResponse }: ErrResponse) => void;
  onLoadingStart?: () => void;
  onLoadingEnd?: () => void;
  headers?: { [key: string]: string };
};

export type UseDELETEOptions<T = any> = {
  onSuccess?: (data: T) => void;
  onError?: ({ status, fetchResponse }: ErrResponse) => void;
  onLoadingStart?: () => void;
  onLoadingEnd?: () => void;
  headers?: { [key: string]: string };
};

export type UsePATCHOptions<T = any> = {
  onSuccess?: (data: T) => void;
  onError?: ({ status, fetchResponse }: ErrResponse) => void;
  onLoadingStart?: () => void;
  onLoadingEnd?: () => void;
  headers?: { [key: string]: string };
};

export type MakeRequestOptions = {
  headers?: { [key: string]: string };
  method: Method;
  body?: any;
  params?: { [key: string]: any };
};
