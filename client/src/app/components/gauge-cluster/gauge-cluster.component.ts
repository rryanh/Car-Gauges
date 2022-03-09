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
    this.gaugeService.getAfCorrection().subscribe((val) => {
      this.afCorrection = val;
    });

    this.gaugeService.getAfLearning().subscribe((val) => {
      this.afLearning = val;
    });

    this.gaugeService.getAfr().subscribe((val) => {
      this.afr = val;
    });

    this.gaugeService.getAit().subscribe((val) => {
      this.ait = val;
    });

    this.gaugeService.getBoost().subscribe((val) => {
      this.boost = val;
    });

    this.gaugeService.getFineLearnKnock().subscribe((val) => {
      this.fineLearnKnock = val;
    });

    this.gaugeService.getIam().subscribe((val) => {
      this.iam = val;
    });

    this.gaugeService.getIdc().subscribe((val) => {
      this.idc = val;
    });

    this.gaugeService.getOilTemp().subscribe((val) => {
      this.oilTemp = val;
    });

    this.gaugeService.getOilPressure().subscribe((val) => {
      this.oilPressure = val;
    });

    this.gaugeService.getRpm().subscribe((val) => {
      this.rpm = val;
    });

    this.gaugeService.getKnock().subscribe((val) => {
      this.knock = val;
    });

    this.gaugeService.getLoad().subscribe((val) => {
      this.load = val;
    });

    this.gaugeService.getIgnitionTotalTiming().subscribe((val) => {
      this.ignitionTotalTiming = val;
    });
    this.gaugeService.getMaf().subscribe((val) => {
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
