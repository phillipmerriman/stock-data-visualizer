import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GraphData, GraphOptions } from '../../../types';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css',
})
export class GraphComponent {
  @Input() graphData!: GraphData;
  @Input() graphOptions!: GraphOptions;
  @Output() graphOutput: EventEmitter<GraphData> =
    new EventEmitter<GraphData>();

  ngOnInit() {
    //TODO: dont need this
    this.graphOutput.emit(this.graphData);
  }
}
