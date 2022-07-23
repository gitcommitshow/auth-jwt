import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-send-jwt2',
  templateUrl: './send-jwt2.component.html',
  styleUrls: ['./send-jwt2.component.scss']
})
export class SendJwt2Component implements OnInit {

  constructor(
    private router : Router,
    private stepService: StepService
  ) { 
    this.stepService.setStep(8)
  }

  ngOnInit(): void {
  }

  backStep() {
    this.stepService.setStep(7)
    this.router.navigate(['send-jwt1'])
  }

  nextStep() {
    this.stepService.setStep(9)
    this.router.navigate(['send-jwt3'])
  }
}
