import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-generate-token1',
  templateUrl: './generate-token1.component.html',
  styleUrls: ['./generate-token1.component.scss']
})
export class GenerateToken1Component implements OnInit {

  constructor(private router: Router,
    private stepService: StepService,
    ) { 
      this.stepService.setStep(5)
    }

  ngOnInit(): void {
  }
  

  backStep(){
    this.stepService.setStep(5)
    this.router.navigate(['generate-token'])
  }
  nextStep(){
    this.stepService.setStep(6)
    this.stepService.setStep(7)
  }
}
