type FetcherInit = {
    baseUrl: string;
    headers?: () => {
        [key: string]: string;
    };
};
interface ErrResponse {
    status: number;
    fetchResponse: Response | null;
}
interface StatefulErrResponse<T = any> extends ErrResponse {
    data: T;
}
type Method = "POST" | "GET" | "DELETE" | "PATCH" | "PUT";
type UseOptions<R = any> = {
    onSuccess?: (data: R) => void;
    onError?: ({ status, data, fetchResponse }: StatefulErrResponse) => void;
    onLoadingStart?: () => void;
    onLoadingEnd?: () => void;
    headers?: {
        [key: string]: string;
    };
    method?: Method;
    params?: {
        [key: string]: string;
    };
};
type UseGETOptions<T = any> = {
    onSuccess?: (data: T) => void;
    onError?: ({ status, fetchResponse }: ErrResponse) => void;
    onLoadingStart?: () => void;
    onLoadingEnd?: () => void;
    headers?: {
        [key: string]: string;
    };
};
type UsePOSTOptions<T = any> = {
    onSuccess?: (data: T) => void;
    onError?: ({ status, fetchResponse }: ErrResponse) => void;
    onLoadingStart?: () => void;
    onLoadingEnd?: () => void;
    headers?: {
        [key: string]: string;
    };
};
type UseDELETEOptions<T = any> = {
    onSuccess?: (data: T) => void;
    onError?: ({ status, fetchResponse }: ErrResponse) => void;
    onLoadingStart?: () => void;
    onLoadingEnd?: () => void;
    headers?: {
        [key: string]: string;
    };
};
type UsePATCHOptions<T = any> = {
    onSuccess?: (data: T) => void;
    onError?: ({ status, fetchResponse }: ErrResponse) => void;
    onLoadingStart?: () => void;
    onLoadingEnd?: () => void;
    headers?: {
        [key: string]: string;
    };
};
type MakeRequestOptions = {
    headers?: {
        [key: string]: string;
    };
    method: Method;
    body?: any;
    params?: {
        [key: string]: string;
    };
};

type ResponseError = ErrResponse | null;
type StatefulResponseError<T = any> = StatefulErrResponse<T> | null;
declare class Fetcher {
    baseUrl: string;
    headers?: () => {
        [key: string]: string;
    };
    defaultRequestOps: MakeRequestOptions;
    constructor(baseUrl: string, headers?: () => {
        [key: string]: string;
    });
    request<T>(url: string, opts?: MakeRequestOptions): Promise<{
        data: T | null;
        error: StatefulResponseError<any>;
    }>;
    useQuery<T>(url: string, opts: UseOptions<T>): {
        data: T | null;
        error: StatefulResponseError<any>;
        refetch: (params?: {
            [key: string]: string;
        }) => Promise<{
            data: T | null;
            error: StatefulResponseError<any>;
        }>;
        isLoading: boolean;
        isError: boolean;
    };
    useMutation<T>(url: string, opts: UseOptions<T>): {
        data: T | null;
        error: StatefulResponseError<any>;
        mutate: (body: any, params?: {
            [key: string]: string;
        } | undefined) => Promise<{
            data: T | null;
            error: StatefulResponseError<any>;
        }>;
        isLoading: boolean;
        isError: boolean;
    };
    useGET<T>(url: string, opts?: UseGETOptions<T>): {
        data: T | null;
        isError: ResponseError;
        isLoading: boolean;
        refetchData: () => Promise<{
            data: T | null;
            error: ResponseError;
        }>;
    };
    usePOST<T>(url: string, opts?: UsePOSTOptions<T>): {
        postData: (body: any) => Promise<{
            data: T | null;
            error: ResponseError;
        }>;
        isError: ResponseError;
        isLoading: boolean;
        data: T | null;
    };
    useDELETE<T>(opts?: UseDELETEOptions<T>): {
        isError: ResponseError;
        isLoading: boolean;
        deleteData: (url: string) => Promise<{
            data: T | null;
            error: ResponseError;
        }>;
        data: T | null;
    };
    usePATCH<T>(opts?: UsePATCHOptions<T>): {
        patchData: (url: string, body: any) => Promise<{
            data: T | null;
            error: ResponseError;
        }>;
        isError: ResponseError;
        isLoading: boolean;
        data: T | null;
    };
}
declare const createFetcher: (opts: FetcherInit) => Fetcher;

export { createFetcher };
