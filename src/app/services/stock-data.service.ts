import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { GetTickersResponse, Stock, StockParams } from '../../types';
import { environment } from '../../environments/environment';

// Injectable is a decorator that marks a class as available to be provided and injected as a dependency
@Injectable({
  providedIn: 'root', // This makes the service available application-wide
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

  // Observables are lazy push collections of multiple values: https://rxjs.dev/guide/observable
  getStockData = (stockParams: StockParams): Observable<Stock> => {
    const url: string = `https://api.polygon.io/v2/aggs/ticker/${stockParams.ticker}/range/${stockParams.multiplier}/${stockParams.timespan}/${stockParams.from}/${stockParams.to}?apiKey=${this.apiKey}`;

    return this.apiService.get(url, {
      stockParams,
      responseType: 'json',
    });
  };
}
