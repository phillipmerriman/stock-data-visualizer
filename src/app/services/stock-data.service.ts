import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Stock, StockParams } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class StockDataService {
  constructor(private apiService: ApiService) {}

  getStockData = (url: string, params: StockParams): Observable<Stock> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };
}
