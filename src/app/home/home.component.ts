import { Component } from '@angular/core';
import { StockDataService } from '../services/stock-data.service';
import { GraphComponent } from '../components/graph/graph.component';
import { GraphData, GraphOptions, Stock, TableData } from '../../types';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../components/table/table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GraphComponent, TableComponent],
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
    //TODO: what are these output functions for?
    console.log('Graph Output', graphData);
  }

  tableData: TableData[] = [];
  onTableOutput(tableData: TableData[]) {
    //TODO: what are these output functions for?
    console.log('Table Output', tableData);
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
      // Should output 'true'
      const labels = stock.results.map((result) =>
        new Date(result.t).toLocaleDateString()
      );
      const closingPrices = stock.results.map((result) => result.c);
      const openingPrices = stock.results.map((result) => result.o);
      this.stocks = [stock];
      this.tableData = stock.results;
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
