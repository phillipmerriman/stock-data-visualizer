import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  //   observe: 'events';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface Stock {
  adjusted: boolean;
  count: number;
  queryCount: number;
  request_id: string;
  results: TableData[];
  resultsCount: number;
  status: string;
  ticker: string;
}

interface GraphDataSet {
  label: string;
  data: Array<Number>;
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
}

export interface GraphData {
  ticker: string;
  labels: string[];
  highestPrice: number;
  lowestPrice: number;
  datasets: Array<GraphDataSet>;
}

export interface GraphOptions {
  responsive: boolean;
  scales: object;
}

export interface TableData {
  c: number; // Closing price
  h: number; // High price
  l: number; // Low price
  n: number; // Number of trades
  o: number; // Opening price
  t: string; // Timestamp
  v: number; // Volume
  vw: number; // Volume-weighted average price
}

interface TickerResult {
  active: boolean;
  cik: string;
  composite_figi: string;
  last_updated_utc: string;
  locale: string;
  market: string;
  name: string;
  primary_exchange: string;
  share_class_figi: string;
  ticker: string;
  type: string;
}

export interface GetTickersResponse {
  count: number;
  next_url: string;
  request_id: string;
  results: Array<TickerResult>;
  status: string;
}

export interface TickerListItem {
  name: string;
  code: string;
}

export interface DropdownEvent {
  value: TickerListItem;
}

export interface StockParams {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  ticker: string;
  multiplier: number;
  timespan: string;
  from: string;
  to: string;
}
