import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  constructor(
    private router: Router,
    private stepService: StepService
  ) {
    this.stepService.setStep(13)
   }

  ngOnInit(): void {
  }

  nextStep(){
    this.stepService.setStep(14)
    this.router.navigate(['disclosures'])
  }
}
