import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { Gauge } from '../Gauge';

@Injectable({
  providedIn: 'root',
})

/**
 * temp until i figure how i want to transfer data on server side
 */
export class GaugeService {
  private api = 'http://localhost:3000/';

  afCorrection = new Subject<Gauge>();
  afLearning = new Subject<Gauge>();
  afr = new Subject<Gauge>();
  ait = new Subject<Gauge>();
  boost = new Subject<Gauge>();
  fineLearnKnock = new Subject<Gauge>();
  iam = new Subject<Gauge>();
  idc = new Subject<Gauge>();
  ignitionTotalTiming = new Subject<Gauge>();
  knock = new Subject<Gauge>();
  load = new Subject<Gauge>();
  maf = new Subject<Gauge>();
  oilPressure = new Subject<Gauge>();
  oilTemp = new Subject<Gauge>();
  rpm = new Subject<Gauge>();

  private afCorrectionGauge = new Gauge('AF Correction', 0, 1, '%');
  private afLearningGauge = new Gauge('AF Learning', 0, 1, '%');
  private afrGauge = new Gauge('AFR', 0, 1, '');
  private aitGauge = new Gauge('AIT', 0, 0, 'C');
  private boostGauge = new Gauge('Boost', -14.7, 1, 'PSI');
  private fineLearnKnockGauge = new Gauge('FLKC', 0, 2, '');
  private iamGauge = new Gauge('AIM', 0, 1, '');
  private idcGauge = new Gauge('IDC', 0, 1, '%');
  private ignitionTotalTimingGauge = new Gauge('Ignition Timing', 0, 1, '');
  private knockGauge = new Gauge('FKC', 0, 2, '');
  private loadGauge = new Gauge('Load', 0, 2, '');
  private mafGauge = new Gauge('Maf', 0, 1, 'g/s');
  private oilPressureGauge = new Gauge('Oil Pressure', 0, 0, 'PSI');
  private oilTempGauge = new Gauge('Oil Temp', 0, 0, 'C');
  private rpmGauge = new Gauge('RPM', 0, 0, '');

  constructor(private http: HttpClient) {
    this.updateDataCycle();
  }

  // Setters
  setData(data: any) {
    this.afCorrection.next(this.afCorrectionGauge.update(data.afCorrection));
    this.afLearning.next(this.afLearningGauge.update(data.afLearning));
    this.afr.next(this.afrGauge.update(data.afr));
    this.ait.next(this.aitGauge.update(data.ait));
    this.boost.next(this.boostGauge.update(data.boost));
    this.fineLearnKnock.next(
      this.fineLearnKnockGauge.update(data.fineLearnKnock)
    );
    this.iam.next(this.iamGauge.update(data.iam));
    this.idc.next(this.idcGauge.update(data.idc));
    this.ignitionTotalTiming.next(
      this.ignitionTotalTimingGauge.update(data.ignitionTotalTiming)
    );
    this.knock.next(this.knockGauge.update(data.knock));
    this.load.next(this.loadGauge.update(data.load));
    this.maf.next(this.mafGauge.update(data.maf));
    this.oilPressure.next(this.oilPressureGauge.update(data.oilPressure));
    this.oilTemp.next(this.oilTempGauge.update(data.oilTemp));
    this.rpm.next(this.rpmGauge.update(data.rpm));
  }

  updateDataCycle() {
    setInterval(() => {
      this.http
        .get<number>(`${this.api}data`)
        .subscribe((val) => this.setData(val));
    }, 95);
  }
}
