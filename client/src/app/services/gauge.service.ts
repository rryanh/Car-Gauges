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

  private afCorrection: Subject<Gauge>;
  private afLearning: Subject<Gauge>;
  private afr: Subject<Gauge>;
  private ait: Subject<Gauge>;
  private boost: Subject<Gauge>;
  private fineLearnKnock: Subject<Gauge>;
  private iam: Subject<Gauge>;
  private idc: Subject<Gauge>;
  private ignitionTotalTiming: Subject<Gauge>;
  private knock: Subject<Gauge>;
  private load: Subject<Gauge>;
  private maf: Subject<Gauge>;
  private oilPressure: Subject<Gauge>;
  private oilTemp: Subject<Gauge>;
  private rpm: Subject<Gauge>;

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
    this.afCorrection = new Subject<Gauge>();
    this.afLearning = new Subject<Gauge>();
    this.afr = new Subject<Gauge>();
    this.ait = new Subject<Gauge>();
    this.boost = new Subject<Gauge>();
    this.fineLearnKnock = new Subject<Gauge>();
    this.iam = new Subject<Gauge>();
    this.idc = new Subject<Gauge>();
    this.ignitionTotalTiming = new Subject<Gauge>();
    this.knock = new Subject<Gauge>();
    this.load = new Subject<Gauge>();
    this.maf = new Subject<Gauge>();
    this.oilPressure = new Subject<Gauge>();
    this.oilTemp = new Subject<Gauge>();
    this.rpm = new Subject<Gauge>();
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

  // getters

  getAfCorrection(): Observable<Gauge> {
    return this.afCorrection.asObservable();
  }
  getAfLearning(): Observable<any> {
    return this.afLearning.asObservable();
  }
  getAfr(): Observable<any> {
    return this.afr.asObservable();
  }
  getLoad(): Observable<any> {
    return this.load.asObservable();
  }
  getAit(): Observable<any> {
    return this.ait.asObservable();
  }
  getBoost(): Observable<any> {
    return this.boost.asObservable();
  }
  getFineLearnKnock(): Observable<any> {
    return this.fineLearnKnock.asObservable();
  }
  getIam(): Observable<any> {
    return this.iam.asObservable();
  }
  getIgnitionTotalTiming(): Observable<any> {
    return this.ignitionTotalTiming.asObservable();
  }
  getIdc(): Observable<any> {
    return this.idc.asObservable();
  }
  getKnock(): Observable<any> {
    return this.knock.asObservable();
  }
  getMaf(): Observable<any> {
    return this.maf.asObservable();
  }
  getOilPressure(): Observable<any> {
    return this.oilPressure.asObservable();
  }
  getOilTemp(): Observable<any> {
    return this.oilTemp.asObservable();
  }
  getRpm(): Observable<any> {
    return this.rpm.asObservable();
  }

  updateDataCycle() {
    setInterval(() => {
      this.http
        .get<number>(`${this.api}data`)
        .subscribe((val) => this.setData(val));
    }, 95);
  }
}
