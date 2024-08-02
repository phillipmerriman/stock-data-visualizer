import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { DropdownEvent, TickerListItem } from '../../../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticker-picker',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './ticker-picker.component.html',
  styleUrl: './ticker-picker.component.css',
})
export class TickerPickerComponent {
  @Input() tickerList!: TickerListItem[];
  @Input() selectedTicker!: TickerListItem;
  @Output() tickerPickerOutput: EventEmitter<TickerListItem> =
    new EventEmitter<TickerListItem>();

  onTickerSelect(event: DropdownEvent) {
    this.selectedTicker = event.value;
    this.tickerPickerOutput.emit(this.selectedTicker);
  }
}
