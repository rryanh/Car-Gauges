import { Component, Input, OnChanges, OnInit, DoCheck } from '@angular/core';
import { Gauge } from 'src/app/Gauge';
import { GaugeService } from 'src/app/services/gauge.service';

/**
 * @todo issue with having children like this is each time new model is recieved we re create each child element and lose its data. need to try and keep this logic inside the serverice tbh
 */
@Component({
  selector: 'app-info-text',
  templateUrl: './info-text.component.html',
  styleUrls: ['./info-text.component.css'],
})
export class InfoTextComponent implements OnInit {
  @Input() model!: Gauge[];

  constructor() {}

  ngOnInit(): void {}
}
