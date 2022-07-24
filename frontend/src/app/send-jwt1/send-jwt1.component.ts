import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-send-jwt1',
  templateUrl: './send-jwt1.component.html',
  styleUrls: ['./send-jwt1.component.scss']
})
export class SendJwt1Component implements OnInit {

  constructor(
    private router: Router,
    private stepService: StepService
  ) { 
    this.stepService.setStep(7)
  }

  ngOnInit(): void {
  }

  backStep() {
    this.stepService.setStep(6)
    this.router.navigate(['generate-token1'])
  }
  nextStep(){
    this.stepService.setStep(8)
    this.router.navigate(['send-jwt2'])
  }
}
