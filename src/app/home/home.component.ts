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
      ticker: 'AAPL',
      multiplier: 1,
      timespan: 'day',
      from: '2024-06-24',
      to: '2024-07-23',
    };
    this.stockDataService.getStockData(params).subscribe((stock) => {
      console.log({ stock });
    });
  }
}
