import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApicalypseConfig extends AxiosRequestConfig {
  queryMethod?: QueryMethod;
  apicalypse?: string;
}

export type QueryMethod = "body" | "url";

declare interface Apicalypse {
  request<T = any>(url: string): Promise<AxiosResponse<T>>;
  requestAll<T = any>(url: string, opts?: RequestAllConfig): Promise<T[]>;

  multi(queries: Apicalypse[]): Apicalypse;
  query(endpoint: string, name: string): Apicalypse;

  fields(fields: string | string[]): Apicalypse;
  sort(fieldWithDirection: string): Apicalypse;
  sort(field: string, direction: SortDirection): Apicalypse;
  limit(limit: number | string): Apicalypse;
  offset(offset: number | string): Apicalypse;
  search(search: string): Apicalypse;
  where(filters: string | string[]): Apicalypse;
}

export interface RequestAllConfig {
  concurrency?: number;
  delay?: number;
}

export type SortDirection = "asc" | "desc";

declare function ApicalypseFactory(opts?: ApicalypseConfig): Apicalypse;
declare function ApicalypseFactory(rawQueryString: string, opts?: ApicalypseConfig): Apicalypse;
export default ApicalypseFactory;
