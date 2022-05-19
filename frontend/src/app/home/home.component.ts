import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  constructor(private router: Router,
              private stepService: StepService) {
  }

  public nextStep(): void {
    this.stepService.nextStep(2);
    this.router.navigate(['/anatomy']);
  }

}
