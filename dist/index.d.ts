type FetcherInit = {
    baseUrl: string;
    headers?: () => {
        [key: string]: string;
    };
};
type UseGETOptions<T> = {
    onSuccess?: (data: T) => void;
    onError?: ({ status, fetchResponse }: {
        status: number;
        fetchResponse: Response;
    }) => void;
    onLoadingStart?: () => void;
    onLoadingEnd?: () => void;
    headers?: {
        [key: string]: string;
    };
};
type UsePOSTOptions<T> = {
    onSuccess?: (data: T) => void;
    onError?: ({ status, fetchResponse }: {
        status: number;
        fetchResponse: Response;
    }) => void;
    onLoadingStart?: () => void;
    onLoadingEnd?: () => void;
    headers?: {
        [key: string]: string;
    };
};
type UseDELETEOptions<T> = {
    onSuccess?: (data: T) => void;
    onError?: ({ status, fetchResponse }: {
        status: number;
        fetchResponse: Response;
    }) => void;
    onLoadingStart?: () => void;
    onLoadingEnd?: () => void;
    headers?: {
        [key: string]: string;
    };
};
type UsePATCHOptions<T> = {
    onSuccess?: (data: T) => void;
    onError?: ({ status, fetchResponse }: {
        status: number;
        fetchResponse: Response;
    }) => void;
    onLoadingStart?: () => void;
    onLoadingEnd?: () => void;
    headers?: {
        [key: string]: string;
    };
};

type ResponseError = {
    status: number;
    fetchResponse: Response;
} | null;
declare class Fetcher {
    baseUrl: string;
    headers?: () => {
        [key: string]: string;
    };
    constructor(baseUrl: string, headers?: () => {
        [key: string]: string;
    });
    useGET<T>(url: string, opts?: UseGETOptions<T>): {
        data: T | null;
        isError: {
            status: number;
            fetchResponse: Response;
        } | null;
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
        isError: {
            status: number;
            fetchResponse: Response;
        } | null;
        isLoading: boolean;
        data: T | null;
    };
    useDELETE<T>(opts?: UseDELETEOptions<T>): {
        isError: {
            status: number;
            fetchResponse: Response;
        } | null;
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
        isError: {
            status: number;
            fetchResponse: Response;
        } | null;
        isLoading: boolean;
        data: T | null;
    };
}
declare const createFetcher: (opts: FetcherInit) => Fetcher;

export { createFetcher };
