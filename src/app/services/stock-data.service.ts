import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { GetTickersResponse, Stock, StockParams } from '../../types';
import { environment } from '../../environments/environment';

// TODO: what is @Injectable
@Injectable({
  providedIn: 'root',
})
export class StockDataService {
  private apiKey: string = environment.apiKey;
  constructor(private apiService: ApiService) {}

  getTickers = (): Observable<GetTickersResponse> => {
    const url: string = `https://api.polygon.io/v3/reference/tickers?active=true&limit=100&apiKey=${this.apiKey}`;

    return this.apiService.get(url, {
      responseType: 'json',
    });
  };

  //TODO: what is Observable
  // Observables are lazy push collections of multiple values: https://rxjs.dev/guide/observable
  getStockData = (params: StockParams): Observable<Stock> => {
    const url: string = `https://api.polygon.io/v2/aggs/ticker/${params.ticker}/range/${params.multiplier}/${params.timespan}/${params.from}/${params.to}?apiKey=${this.apiKey}`;

    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };
}
