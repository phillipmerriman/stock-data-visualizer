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

  //TODO: can we remove stocks?
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
    //TODO: what are these output functions for and when are they ran? I dont think I need these (reference onTickerChange here and in home.component.html)
  }

  tableData: TableData[] = [];
  onTableOutput(tableData: TableData[]) {
    //TODO: what are these output functions for and when are they ran? I dont think I need these (reference onTickerChange here and in home.component.html)
  }

  //TODO: can we move tickerList to ticker-picker.component.ts?
  tickerList: TickerListItem[] = [];
  selectedTicker: TickerListItem = {
    name: 'Apple Inc.',
    code: 'AAPL',
  };
  onTickerChange(event: any) {
    this.stockApiParams = {
      ...this.stockApiParams,
      ticker: event.code,
    };
    this.handleGetStockData();
  }

  stockApiParams = {
    ticker: this.selectedTicker.code,
    multiplier: 1,
    timespan: 'day',
    from: '2024-06-24',
    to: '2024-07-23',
  };
  //TODO: I think we can move dateRange to date-picker.component.ts
  dateRange: Date[] = [];
  onDateChange(event: any) {
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
    //TODO: add response error handling here, see the getTickers call below (test with AAALY ticker, "stock.results is undefined" )
    this.stockDataService
      .getStockData(this.stockApiParams)
      .subscribe((stock: Stock) => {
        const labels = stock.results.map((result) =>
          new Date(result.t).toLocaleDateString()
        );
        const closingPrices = stock.results.map((result) => result.c);
        const openingPrices = stock.results.map((result) => result.o);
        this.stocks = [stock];
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
          //TODO: if more than x number of days from datepicker, render every other day
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

  ngOnInit() {
    this.stockDataService.getTickers().subscribe({
      next: (tickers: GetTickersResponse) => {
        this.tickerList = tickers.results.map((ticker) => {
          return {
            name: `${ticker.name} | ${ticker.ticker}`,
            code: ticker.ticker,
          };
        });
      },
      error: (error) => console.log(error),
    });
    this.handleGetStockData();
  }
}
