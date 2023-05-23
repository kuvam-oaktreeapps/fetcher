export type FetcherInit = {
  baseUrl: string;
  headers?: () => { [key: string]: string };
};

export type UseGETOptions<T> = {
  onSuccess?: (data: T) => void;
  onError?: ({ status, fetchResponse }: { status: number; fetchResponse: Response }) => void;
  onLoadingStart?: () => void;
  onLoadingEnd?: () => void;
  headers?: { [key: string]: string };
};

export type UsePOSTOptions<T> = {
  onSuccess?: (data: T) => void;
  onError?: ({ status, fetchResponse }: { status: number; fetchResponse: Response }) => void;
  onLoadingStart?: () => void;
  onLoadingEnd?: () => void;
  headers?: { [key: string]: string };
};

export type UseDELETEOptions<T> = {
  onSuccess?: (data: T) => void;
  onError?: ({ status, fetchResponse }: { status: number; fetchResponse: Response }) => void;
  onLoadingStart?: () => void;
  onLoadingEnd?: () => void;
  headers?: { [key: string]: string };
};

export type UsePATCHOptions<T> = {
  onSuccess?: (data: T) => void;
  onError?: ({ status, fetchResponse }: { status: number; fetchResponse: Response }) => void;
  onLoadingStart?: () => void;
  onLoadingEnd?: () => void;
  headers?: { [key: string]: string };
};
