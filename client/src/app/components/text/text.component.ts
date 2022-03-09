import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Gauge } from 'src/app/Gauge';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
})
export class TextComponent implements OnInit, OnChanges {
  @Input() gauge!: Gauge;
  constructor() {}

  ngOnChanges(): void {}

  ngOnInit(): void {}
}
