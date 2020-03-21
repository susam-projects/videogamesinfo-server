import { AxiosRequestConfig, AxiosResponse } from "axios";

declare interface Builder {
  // private readonly filterArray: string[];
  // readonly queryEndpoint: string | undefined;
  // readonly queryName: string | undefined;
  readonly apicalypse: string;
  readonly isMulti: boolean | undefined;
  build(): Builder;
  buildMulti(queries: Builder[]): Builder;
  multi(queries: Builder[]): Builder;

  query(endpoint: string, name: string): Builder;
  fields(fields: string): Builder;
  fields(fields: string[]): Builder;
  sort(fieldPlusDirection: string): Builder;
  sort(field: string, direction: SortDirection): Builder;
  limit(limit: number | string): Builder;
  offset(offset: number | string): Builder;
  search(search: string): Builder;
  where(filters: string): Builder;
  where(filters: string[]): Builder;
}

export type SortDirection = "asc" | "desc";

declare interface ApicalypseConfig extends AxiosRequestConfig {
  queryMethod?: QueryMethod;
  apicalypse?: string;
}

export type QueryMethod = "body" | "url";

declare interface Apicalypse extends Builder {
  // private readonly config: ApicalypseConfig
  // private constructOptions(url?: string): ApicalypseConfig;
  request<T>(url: string): Promise<AxiosResponse<T>>;
  // private resetRequest(): void;
  // private cleanLimitOffset(): { limit?: number, offset?: number };
  requestAll<T>(url: string, opts?: { concurrency?: number, delay?: number }): Promise<T[]>;
}

declare function factory(opts?: ApicalypseConfig): Apicalypse;
declare function factory(rawQueryString: string, opts?: ApicalypseConfig): Apicalypse;
export default factory;
