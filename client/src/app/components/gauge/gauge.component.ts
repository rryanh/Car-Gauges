import { Component, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { Gauge } from '../../Gauge';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css'],
})
export class GaugeComponent implements OnInit, DoCheck {
  @Input() gauge?: Gauge;
  @Input() maxValue!: number;
  @Input() minValue = 0;
  @Input() displayOffset = 0;
  @Input() displayFlip = 0;
  lastGaugeVal = 0;

  transform!: number;

  constructor() {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    if (this.lastGaugeVal != this.gauge?.value) {
      this.updateGauge();
    }
  }

  updateGauge() {
    if (!this.gauge) return;

    // set display value

    let correctedValue = 0;

    if (this.gauge.value > 0) correctedValue = +this.gauge.value;
    if (this.gauge.value > this.maxValue) correctedValue = this.maxValue;

    this.transform =
      correctedValue / (this.maxValue * 2) +
      this.displayFlip +
      this.displayOffset;
  }
}
