import { Component } from '@angular/core';
import { StockDataService } from '../services/stock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private stockDataService: StockDataService) {}

  // when this component is initialized, the ngOnInit function is called:
  ngOnInit() {
    const params = {
      stockSymbol: 'AAPL',
      multiplier: 1,
      timespan: 'day',
      from: '2024-06-24',
      to: '2024-07-23',
    };
    const url = `https://api.polygon.io/v2/aggs/ticker/${params.stockSymbol}/range/${params.multiplier}/${params.timespan}/${params.from}/${params.to}?apiKey=0jAqt4lLvD8yXEKlGNhPLtA8UVdp6Mrg`;
    this.stockDataService.getStockData(url, params).subscribe((stock) => {
      console.log({ stock });
    });
  }
}
