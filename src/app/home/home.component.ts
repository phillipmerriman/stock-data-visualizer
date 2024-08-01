import { Component } from '@angular/core';
import { StockDataService } from '../services/stock-data.service';
import { DatePickerComponent } from '../components/date-picker/date-picker.component';
import { GraphComponent } from '../components/graph/graph.component';
import { TableComponent } from '../components/table/table.component';
import { TickerPickerComponent } from '../components/ticker-picker/ticker-picker.component';
import {
  GetTickersResponse,
  GraphData,
  GraphOptions,
  Stock,
  StockParams,
  TableData,
  TickerListItem,
} from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    GraphComponent,
    TableComponent,
    TickerPickerComponent,
    DatePickerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private stockDataService: StockDataService) {}

  graphData: GraphData = {
    ticker: '',
    labels: [],
    highestPrice: 0,
    lowestPrice: 0,
    datasets: [],
  };

  graphOptions: GraphOptions = {
    responsive: true,
    scales: {},
  };

  tableData: TableData[] = [];

  tickerList: TickerListItem[] = [];

  selectedTicker: TickerListItem = {
    name: 'Apple Inc.',
    code: 'AAPL',
  };

  onTickerChange(event: TickerListItem) {
    this.stockApiParams = {
      ...this.stockApiParams,
      ticker: event.code,
    };
    this.handleGetStockData();
  }

  stockApiParams: StockParams = {
    ticker: this.selectedTicker.code,
    multiplier: 1,
    timespan: 'day',
    from: '2024-06-24',
    to: '2024-07-23',
  };

  onDateChange(event: string[]) {
    if (event[0] && event[1]) {
      this.stockApiParams = {
        ...this.stockApiParams,
        from: event[0],
        to: event[1],
      };
      this.handleGetStockData();
    }
  }

  handleGetStockData() {
    this.stockDataService.getStockData(this.stockApiParams).subscribe({
      next: (stock: Stock) => {
        if (!stock.results) {
          this.graphData = {
            ticker: `${stock.ticker} has no data for the selected date range.`,
            labels: [],
            highestPrice: 0,
            lowestPrice: 0,
            datasets: [],
          };
          this.tableData = [];
          return;
        }
        const labels: string[] = stock.results.map((result) =>
          new Date(result.t).toLocaleDateString()
        );
        const closingPrices: number[] = stock.results.map((result) => result.c);
        const openingPrices: number[] = stock.results.map((result) => result.o);
        const allPrices: number[] = [...closingPrices, ...openingPrices];
        this.tableData = stock.results.map((result) => {
          const date = new Date(result.t).toLocaleDateString();
          return {
            ...result,
            t: date,
          };
        });
        this.graphData = {
          ticker: stock.ticker,
          labels: labels,
          highestPrice: Math.max(...allPrices),
          lowestPrice: Math.min(...allPrices),
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
      },
      error: (error) =>
        console.error({ status: error.status, message: error.error.error }),
    });
  }

  ngOnInit() {
    this.stockDataService.getTickers().subscribe({
      next: (tickers: GetTickersResponse) => {
        this.tickerList = tickers.results.map((ticker) => {
          return {
            name: `${ticker.ticker} | ${ticker.name}`,
            code: ticker.ticker,
          };
        });
      },
      error: (error) => console.log(error),
    });
    this.handleGetStockData();
  }
}
