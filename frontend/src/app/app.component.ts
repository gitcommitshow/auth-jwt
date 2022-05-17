import { Component } from '@angular/core';

import { StepService } from './shared/services/step.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public step: number;

  constructor(private stepService: StepService) {
    this.step = 1;
    this.stepService.step.subscribe((step: number) => {
      if (step) {
        this.step = step;
      }
    });
  }

}
