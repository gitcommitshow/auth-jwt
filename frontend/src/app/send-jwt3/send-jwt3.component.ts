import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-send-jwt3',
  templateUrl: './send-jwt3.component.html',
  styleUrls: ['./send-jwt3.component.scss']
})
export class SendJwt3Component implements OnInit {

  constructor(
    private router: Router,
    private stepService: StepService
  ) { 
    this.stepService.setStep(9)
  }

  ngOnInit(): void {
  }

  backStep(){
    this.stepService.setStep(8)
    this.router.navigate(['send-jwt2'])
  }
  moveForward(){
    this.stepService.setStep(9)
    this.router.navigate(['send-jwt4'])
  }
  nextStep(){
    this.stepService.setStep(10)
    this.router.navigate(['send-jwt5'])
  }
}
