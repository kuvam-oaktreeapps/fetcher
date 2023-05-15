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
type UsePOSTOptions = {
    onSuccess?: () => void;
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
type UseDELETEOptions = {
    onSuccess?: () => void;
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
type UsePATCHOptions = {
    onSuccess?: () => void;
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
        refetch: () => Promise<void>;
    };
    usePOST(url: string, opts?: UsePOSTOptions): {
        post: (body: any) => Promise<void>;
        isError: {
            status: number;
            fetchResponse: Response;
        } | null;
        isLoading: boolean;
    };
    useDELETE(url: string, opts?: UseDELETEOptions): {
        isError: {
            status: number;
            fetchResponse: Response;
        } | null;
        isLoading: boolean;
        delete: () => Promise<void>;
    };
    usePATCH(url: string, opts?: UsePATCHOptions): {
        patch: (body: any) => Promise<void>;
        isError: {
            status: number;
            fetchResponse: Response;
        } | null;
        isLoading: boolean;
    };
}
declare const createFetcher: (opts: FetcherInit) => Fetcher;

export { createFetcher };
