import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CalendarModule, FormsModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
  providers: [DatePipe],
})
export class DatePickerComponent {
  dateRange: Date[] = [];
  formattedDateRange: string[] = ['yyyy-MM-dd', 'yyyy-MM-dd'];
  @Output() datePickerOutput: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();
  maxDate: Date;

  constructor(private datePipe: DatePipe) {
    this.maxDate = this.calculateTomorrow();
  }

  calculateTomorrow(): Date {
    const today: Date = new Date();
    const tomorrow: Date = new Date();
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  }

  onDateSelect() {
    if (this.dateRange && this.dateRange.length === 2) {
      const formattedStartDate: string = this.datePipe.transform(
        this.dateRange[0],
        'yyyy-MM-dd'
      )!;
      const formattedEndDate: string = this.datePipe.transform(
        this.dateRange[1],
        'yyyy-MM-dd'
      )!;
      this.formattedDateRange = [formattedStartDate, formattedEndDate];
    }
    this.datePickerOutput.emit(this.formattedDateRange);
  }
}
