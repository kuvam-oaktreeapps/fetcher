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
        refetchData: () => Promise<void>;
    };
    usePOST(url: string, opts?: UsePOSTOptions): {
        postData: (body: any) => Promise<void>;
        isError: {
            status: number;
            fetchResponse: Response;
        } | null;
        isLoading: boolean;
    };
    useDELETE(opts?: UseDELETEOptions): {
        isError: {
            status: number;
            fetchResponse: Response;
        } | null;
        isLoading: boolean;
        deleteData: (url: string) => Promise<void>;
    };
    usePATCH(opts?: UsePATCHOptions): {
        patchData: (url: string, body: any) => Promise<void>;
        isError: {
            status: number;
            fetchResponse: Response;
        } | null;
        isLoading: boolean;
    };
}
declare const createFetcher: (opts: FetcherInit) => Fetcher;

export { createFetcher };
