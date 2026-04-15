export type FetchMiddlewareNext = (
  url: string,
  init: RequestInit,
) => Promise<Response>;
export type FetchMiddleware = (
  url: string,
  init: RequestInit,
  next: FetchMiddlewareNext,
) => Promise<Response>;

export type APIClientOptions = {
  baseURL?: string;
  middlewares?: FetchMiddleware[];
};

export async function fetchWithMiddlewares(
  url: string,
  init: RequestInit,
  middlewares?: FetchMiddleware[],
): Promise<Response> {
  const execute = (middlewares ?? []).reduce<FetchMiddlewareNext>(
    (next, middleware) => {
      return async (url: string, init: RequestInit) => {
        return await middleware(url, init, next);
      };
    },
    async (url: string, init: RequestInit) => await fetch(url, init),
  );

  return execute(url, init);
}
