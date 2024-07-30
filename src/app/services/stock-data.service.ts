import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { GetTickersResponse, Stock, StockParams } from '../../types';

// TODO: what is @Injectable
@Injectable({
  providedIn: 'root',
})
export class StockDataService {
  constructor(private apiService: ApiService) {}

  getTickers = (): Observable<GetTickersResponse> => {
    const url = `https://api.polygon.io/v3/reference/tickers?active=true&limit=100&apiKey=0jAqt4lLvD8yXEKlGNhPLtA8UVdp6Mrg`;

    return this.apiService.get(url, {
      responseType: 'json',
    });
  };

  //TODO: what is Observable
  // Observables are lazy push collections of multiple values: https://rxjs.dev/guide/observable
  getStockData = (params: StockParams): Observable<Stock> => {
    const url = `https://api.polygon.io/v2/aggs/ticker/${params.ticker}/range/${params.multiplier}/${params.timespan}/${params.from}/${params.to}?apiKey=0jAqt4lLvD8yXEKlGNhPLtA8UVdp6Mrg`;

    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };
}
