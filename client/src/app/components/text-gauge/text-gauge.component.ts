import { Component, Input, OnInit } from '@angular/core';
import { Gauge } from 'src/app/Gauge';

@Component({
  selector: 'app-text-gauge',
  templateUrl: './text-gauge.component.html',
  styleUrls: ['./text-gauge.component.css'],
})
export class TextGaugeComponent implements OnInit {
  @Input() gauge?: Gauge;

  constructor() {}

  ngOnInit(): void {}
}
