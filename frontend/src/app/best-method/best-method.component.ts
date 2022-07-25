import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-best-method',
  templateUrl: './best-method.component.html',
  styleUrls: ['./best-method.component.scss']
})
export class BestMethodComponent implements OnInit {

  constructor(
    private router: Router,
    private stepService: StepService
  ) {
    this.stepService.setStep(11)
   }

  ngOnInit(): void {
  }
  backStep(){
    this.stepService.setStep(10)
    this.router.navigate(['send-jwt4'])
  } 
  nextStep(){
    this.stepService.setStep(12)
    this.router.navigate(['implement-logout'])
  }
}
