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
  @Input() dateRange!: Date[];
  formattedDateRange: string[] = ['yyyy-MM-dd', 'yyyy-MM-dd'];
  @Output() datePickerOutput: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();
  maxDate: Date;

  constructor(private datePipe: DatePipe) {
    this.maxDate = this.calculateTomorrow();
  }

  calculateTomorrow(): Date {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  }

  onDateSelect(event: any) {
    if (this.dateRange && this.dateRange.length === 2) {
      const formattedStartDate = this.datePipe.transform(
        this.dateRange[0],
        'yyyy-MM-dd'
      )!;
      const formattedEndDate = this.datePipe.transform(
        this.dateRange[1],
        'yyyy-MM-dd'
      )!;
      this.formattedDateRange = [formattedStartDate, formattedEndDate];
    }
    this.datePickerOutput.emit(this.formattedDateRange);
  }
}
