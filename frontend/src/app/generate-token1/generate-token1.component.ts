import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemoService } from '../shared/services/demo.service';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-generate-token1',
  templateUrl: './generate-token1.component.html',
  styleUrls: ['./generate-token1.component.scss']
})
export class GenerateToken1Component implements OnInit {

  generatedToken: string | null = ""
  constructor(private router: Router,
    private demoService: DemoService,
    private stepService: StepService,
    ) { 
      this.stepService.setStep(5)
    }

  ngOnInit(): void {
    var myToken = localStorage.getItem('token')
    this.generatedToken = myToken
  }
  

  backStep(){
    this.stepService.setStep(5)
    this.router.navigate(['generate-token'])
  }
  nextStep(){
    this.stepService.setStep(6)
    this.stepService.setStep(7)
    this.router.navigate(['/send-jwt1'])
  }
}
