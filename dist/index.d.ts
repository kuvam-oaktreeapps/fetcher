type FetcherInit = {
    baseUrl: string;
    headers?: () => {
        [key: string]: string;
    };
};
interface StatefulErrResponse<T = any> {
    status: number;
    fetchResponse: Response | null;
    data: T;
}
type Method = "POST" | "GET" | "DELETE" | "PATCH" | "PUT";
type UseOptions<T = any> = {
    onSuccess?: (data: T) => void;
    onError?: ({ status, data, fetchResponse }: StatefulErrResponse) => void;
    onLoadingStart?: () => void;
    onLoadingEnd?: () => void;
    headers?: {
        [key: string]: string;
    };
    method?: Method;
    params?: {
        [key: string]: any;
    };
};
type MakeRequestOptions = {
    headers?: {
        [key: string]: string;
    };
    method?: Method;
    body?: any;
    params?: {
        [key: string]: any;
    };
};

type StatefulResponseError<T = any> = StatefulErrResponse<T> | null;
declare class Fetcher {
    baseUrl: string;
    headers?: () => {
        [key: string]: string;
    };
    constructor(baseUrl: string, headers?: () => {
        [key: string]: string;
    });
    request<T>(url: string, opts?: MakeRequestOptions): Promise<{
        data: T | null;
        error: StatefulResponseError<any>;
    }>;
    useQuery<T>(url: string, opts?: UseOptions<T>): {
        data: T | null;
        error: StatefulResponseError<any>;
        refetch: (params?: {
            [key: string]: any;
        }) => Promise<{
            data: T | null;
            error: StatefulResponseError<any>;
        }>;
        isLoading: boolean;
        isError: boolean;
    };
    useMutation<T>(url: string, opts?: UseOptions<T>): {
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
}
declare const createFetcher: (opts: FetcherInit) => Fetcher;

export { createFetcher };
