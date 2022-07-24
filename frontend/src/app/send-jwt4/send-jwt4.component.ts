import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-send-jwt4',
  templateUrl: './send-jwt4.component.html',
  styleUrls: ['./send-jwt4.component.scss']
})
export class SendJwt4Component implements OnInit {

  constructor(
    private router: Router,
    private stepService: StepService
  ) { 
    this.stepService.setStep(10)
  }

  ngOnInit(): void {
  }

  backStep(){
    this.stepService.setStep(9)
    this.router.navigate(['send-jwt3'])
  }
  nextStep(){
    this.stepService.setStep(11)
  }
}
