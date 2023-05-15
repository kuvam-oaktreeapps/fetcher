type FetcherInit = {
    baseUrl: string;
    headers?: () => {
        [key: string]: string;
    };
};
type UseGETOptions<T> = {
    onSuccess: (data: T) => void;
    onError: ({ status, fetchResponse }: {
        status: number;
        fetchResponse: Response;
    }) => void;
    onLoadingStart: () => void;
    onLoadingEnd: () => void;
    headers?: {
        [key: string]: string;
    };
};
type UsePOSTOptions = {
    onSuccess: () => void;
    onError: ({ status, fetchResponse }: {
        status: number;
        fetchResponse: Response;
    }) => void;
    onLoadingStart: () => void;
    onLoadingEnd: () => void;
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
    useGET<T>(urlPathname: string, opts?: UseGETOptions<T>): {
        data: T | null;
        isError: {
            status: number;
            fetchResponse: Response;
        } | null;
        isLoading: boolean;
        refetch: () => Promise<void>;
    };
    usePOST<T>(urlPathname: string, opts?: UsePOSTOptions): {
        post: (body: T) => Promise<void>;
        isError: {
            status: number;
            fetchResponse: Response;
        } | null;
        isLoading: boolean;
    };
}
declare const createFetcher: (opts: FetcherInit) => Fetcher;

export { createFetcher };
