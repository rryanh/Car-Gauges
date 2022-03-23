import { Component, OnInit } from '@angular/core';
import { Gauge } from 'src/app/Gauge';
import { GaugeService } from 'src/app/services/gauge.service';

@Component({
  selector: 'app-gauge-cluster',
  templateUrl: './gauge-cluster.component.html',
  styleUrls: ['./gauge-cluster.component.css'],
})
export class GaugeClusterComponent implements OnInit {
  afCorrection!: Gauge;
  afLearning!: Gauge;
  afr!: Gauge;
  ait!: Gauge;
  boost!: Gauge;
  fineLearnKnock!: Gauge;
  iam!: Gauge;
  idc!: Gauge;
  ignitionTotalTiming!: Gauge;
  knock!: Gauge;
  load!: Gauge;
  maf!: Gauge;
  oilPressure!: Gauge;
  oilTemp!: Gauge;
  rpm!: Gauge;
  model: Gauge[] = [];
  constructor(private gaugeService: GaugeService) {}

  ngOnInit(): void {
    this.gaugeService.afCorrection.subscribe(
      (val) => (this.afCorrection = val)
    );

    this.gaugeService.afLearning.subscribe((val) => {
      this.afLearning = val;
    });

    this.gaugeService.afr.subscribe((val) => {
      this.afr = val;
    });

    this.gaugeService.ait.subscribe((val) => {
      this.ait = val;
    });

    this.gaugeService.boost.subscribe((val) => {
      this.boost = val;
    });

    this.gaugeService.fineLearnKnock.subscribe((val) => {
      this.fineLearnKnock = val;
    });

    this.gaugeService.iam.subscribe((val) => {
      this.iam = val;
    });

    this.gaugeService.idc.subscribe((val) => {
      this.idc = val;
    });

    this.gaugeService.oilTemp.subscribe((val) => {
      this.oilTemp = val;
    });

    this.gaugeService.oilPressure.subscribe((val) => {
      this.oilPressure = val;
    });

    this.gaugeService.rpm.subscribe((val) => {
      this.rpm = val;
    });

    this.gaugeService.knock.subscribe((val) => {
      this.knock = val;
    });

    this.gaugeService.load.subscribe((val) => {
      this.load = val;
    });

    this.gaugeService.ignitionTotalTiming.subscribe((val) => {
      this.ignitionTotalTiming = val;
    });
    this.gaugeService.maf.subscribe((val) => {
      this.maf = val;
      this.model = [
        this.maf,
        this.ait,
        this.idc,
        this.ignitionTotalTiming,
        this.load,
        this.rpm,
      ];
    });
  }
}
