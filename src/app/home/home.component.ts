import { Component } from '@angular/core';
import { StockDataService } from '../services/stock-data.service';
import { GraphComponent } from '../components/graph/graph.component';
import { GraphData, GraphOptions, Stock } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GraphComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private stockDataService: StockDataService) {}

  stocks: Stock[] = [];
  graphData: GraphData = {
    ticker: '',
    labels: [],
    datasets: [],
  };
  graphOptions: GraphOptions = {
    responsive: true,
    scales: {},
  };
  onGraphOutput(graphData: GraphData) {
    console.log('Graph Output', graphData);
  }

  ngOnInit() {
    const params = {
      ticker: 'AAPL',
      multiplier: 1,
      timespan: 'day',
      from: '2024-06-24',
      to: '2024-07-23',
    };
    this.stockDataService.getStockData(params).subscribe((stock: Stock) => {
      console.log({ results: stock });
      const labels = stock.results.map((result) =>
        new Date(result.t).toLocaleDateString()
      );
      const closingPrices = stock.results.map((result) => result.c);
      const openingPrices = stock.results.map((result) => result.o);
      this.stocks = [stock];
      this.graphData = {
        ticker: stock.ticker,
        labels: labels,
        datasets: [
          {
            label: 'Closing Prices',
            data: closingPrices,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
          {
            label: 'Opening Prices',
            data: openingPrices,
            borderColor: 'rgba(70, 292, 192, 1)',
            backgroundColor: 'rgba(70, 292, 192, 0.2)',
            fill: true,
          },
        ],
      };
      this.graphOptions = {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
            grid: {
              color: 'var(--primary-color)',
              drawBorder: true,
            },
          },
        },
      };
    });
  }
}
