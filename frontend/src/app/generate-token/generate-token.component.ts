import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.scss']
})
export class GenerateTokenComponent implements OnInit {

  constructor(private router: Router,
    private stepService: StepService) {
      this.stepService.setStep(5)
     }

  ngOnInit(): void {
  }

  nextStep(){
    this.stepService.setStep(5)
    this.router.navigate(['generate-token1'])
  }

}
