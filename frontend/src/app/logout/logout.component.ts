import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private stepService: StepService
  ) {
    this.stepService.setStep(12)
   }

  ngOnInit(): void {
  }

  backStep(){
    this.stepService.setStep(11)
    this.router.navigate(['best-method'])
  }
  nextStep(){
    this.stepService.setStep(13)
    this.router.navigate(['finish'])
  }

}
