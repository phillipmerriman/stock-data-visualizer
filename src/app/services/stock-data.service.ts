import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Stock, StockParams } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class StockDataService {
  constructor(private apiService: ApiService) {}

  getStockData = (params: StockParams): Observable<Stock> => {
    const url = `https://api.polygon.io/v2/aggs/ticker/${params.ticker}/range/${params.multiplier}/${params.timespan}/${params.from}/${params.to}?apiKey=0jAqt4lLvD8yXEKlGNhPLtA8UVdp6Mrg`;

    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };
}
