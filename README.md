# Simple React Hooks Fetcher Library

A type-safe simple and lightweight fetch wrapper for React.js applications with convenient functions for crafting & handling a request.

## Installation

```bash
npm install @oaktree/fetcher
```

## Quick Start

```javascript
// fetcher.js
import { createFetcher } from "@oaktree/fetcher";

const fetcher = createFetcher({
  baseUrl: "https://myapi.com/v3/",
  headers: () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    // ...
  }),
});

export default fetcher;
```

```javascript
// App.js

...
import fetcher from "./fetcher";

export default function App() {
  const posts = fetcher.useQuery("posts")

  return (
    ...
    {posts.data.map(post => ...)}
    ...
  )
}
```

## API Reference

### Methods

#### `request`

```typescript
async request<T>(
  url: string,
  opts: {
    headers?: { [key: string]: string },
    method?: "POST" | "GET" | "DELETE" | "PATCH" | "PUT",
    body?: any,
    params?: { [key: string]: any },
  }
): Promise<{
    data: null | T,
    error: null | {
      status: number,
      fetchResponse: Response | null,
      data: T,
    }
  }>
```

- `url` (string): The URL path for the request.
- `opts` (optional object): Request options.
  - `method` (string): The HTTP method for the request (default: "GET").
  - `headers` (object): Headers to be included in the request.
  - `body` (any): The request body.
  - `params` (object): Query parameters to be included in the request.

Returns an object with `data` and `error` properties.

#### `useQuery`

```typescript
useQuery<T>(
  url: string,
  opts?: {
    onSuccess?: (data: T) => void,
    onError?: ({
      status: number,
      fetchResponse: Response | null,
      data: T,
    }) => void,
    onLoadingStart?: () => void,
    onLoadingEnd?: () => void,
    headers?: { [key: string]: any },
    method?: "POST" | "GET" | "DELETE" | "PATCH" | "PUT",,
    params?: { [key: string]: any },
  }
): {
    data: null | T,
    error: null | {
      status: number,
      fetchResponse: Response | null,
      data: T,
    },
    isLoading: boolean,
    isError: boolean,
    refetch: (params?: { [key: string]: any }) => Promise<{
      data: null | T,
      error: null | {
        status: number,
        fetchResponse: Response | null,
        data: T,
      },
    }>,
  }
```

- `url` (string): The URL path for the query.
- `opts` (optional object): Query options.
  - `headers` (object): Headers to be included in the request.
  - `method` (string): The HTTP method for the request (default: "GET").
  - `params` (object): Query parameters to be included in the request.
  - `onLoadingStart` (function): Callback function triggered when the request starts loading.
  - `onLoadingEnd` (function): Callback function triggered when the request finishes loading.
  - `onError` (function): Callback function triggered when an error occurs.
  - `onSuccess` (function): Callback function triggered when the request is successful.

Returns an object with the following properties:

- `data` (null | T): The query response data.
- `error` (object): The query response error.
- `refetch` (function): Function to manually trigger the query.
- `isLoading` (boolean): Indicates if the query is currently loading.
- `isError` (boolean): Indicates if the query encountered an error.

#### `useMutation`

```typescript
useMutation<T>(
  url: string,
  opts?: {
    onSuccess?: (data: T) => void,
    onError?: ({
      status: number,
      fetchResponse: Response | null,
      data: T,
    }) => void,
    onLoadingStart?: () => void,
    onLoadingEnd?: () => void,
    headers?: { [key: string]: any },
    method?: "POST" | "GET" | "DELETE" | "PATCH" | "PUT",,
    params?: { [key: string]: any },
  }
): {
    data: null | T,
    error: null | {
      status: number,
      fetchResponse: Response | null,
      data: T,
    },
    isLoading: boolean,
    isError: boolean,
    mutate: (body: any, params?: { [key: string]: string }) => Promise<{
      data: null | T,
      error: null | {
        status: number,
        fetchResponse: Response | null,
        data: T,
      },
    }>,
  }
```

- `url` (string): The URL path for the mutation.
- `opts` (optional object): Mutation options.
  - `headers` (object): Headers to be included in the request.
  - `method` (string): The HTTP method for the request (default: "POST").
  - `params` (object): Query parameters to be included in the request.
  - `onLoadingStart` (function): Callback function triggered when the request starts loading.
  - `onLoadingEnd` (function): Callback function triggered when the request finishes loading.
  - `onError` (function): Callback function triggered when an error occurs.
  - `onSuccess` (function): Callback function triggered when the request is successful.

Returns an object with the following properties:

- `data` (null | T): The mutation response data.
- `error` (object): The mutation response error.
- `mutate` (function): Function to manually trigger the mutation.
- `isLoading` (boolean): Indicates if the mutation is currently loading.
- `isError` (boolean): Indicates if the mutation encountered an error.

### Creating Fetcher Instances

#### `createFetcher`

```typescript
createFetcher(opts: FetcherInit): Fetcher
```

- `opts` (object): Options for creating the `Fetcher` instance.
  - `baseUrl` (string): The base URL for the API.
  - `headers` (optional function): A function that returns an object containing headers to be included in the requests.

Returns a new instance of the `Fetcher`.
