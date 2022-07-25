import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-disclosures',
  templateUrl: './disclosures.component.html',
  styleUrls: ['./disclosures.component.scss']
})
export class DisclosuresComponent implements OnInit {

  constructor(
    private router: Router,
    private stepService: StepService
  ) { 
    this.stepService.setStep(14)
  }

  ngOnInit(): void {
  }
  nextStep(){
    this.stepService.setStep(15)
    this.router.navigate(['reference'])
  }
}
