import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepService {

  private stepSubject: BehaviorSubject<number>;
  public step: Observable<number>;

  constructor() {
    this.stepSubject = new BehaviorSubject<number>(1);
    this.step = this.stepSubject.asObservable();
  }

  public nextStep(order: number): void {
    this.stepSubject.next(order);
  }

}
