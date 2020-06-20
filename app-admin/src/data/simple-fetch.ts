interface SimpleFetchOptions<T> {
  method: string;
  headers: Record<string, string>;
  body: T;
}
type FetchBody = string | Blob | FormData | URLSearchParams | null;
type SimpleFetch = <T extends FetchBody = string>(url: string, options: SimpleFetchOptions<T>) => Promise<Response>;

const simpleFetch: SimpleFetch = fetch;

export default simpleFetch;
