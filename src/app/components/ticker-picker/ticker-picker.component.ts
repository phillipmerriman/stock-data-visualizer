import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { TickerListItem } from '../../../types';

@Component({
  selector: 'app-ticker-picker',
  standalone: true,
  imports: [DropdownModule],
  templateUrl: './ticker-picker.component.html',
  styleUrl: './ticker-picker.component.css',
})
export class TickerPickerComponent {
  @Input() tickerList!: TickerListItem[];
  @Input() selectedTicker!: TickerListItem;
  @Output() tickerPickerOutput: EventEmitter<TickerListItem[]> =
    new EventEmitter<TickerListItem[]>();

  ngOnInit() {
    console.log('graphComponent', this.tickerList);
    this.tickerPickerOutput.emit(this.tickerList);
  }
}
