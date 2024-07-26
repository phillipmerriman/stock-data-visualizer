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

interface Result {
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  t: number;
  v: number;
  vw: number;
}

export interface Stock {
  adjusted: boolean;
  count: number;
  queryCount: number;
  request_id: string;
  results: Result[];
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
  datasets: Array<GraphDataSet>;
}

export interface GraphOptions {
  responsive: boolean;
  scales: object;
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
