import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss']
})
export class ReferenceComponent implements OnInit {

  constructor(
    private router: Router,
    private stepService: StepService
  ) { 
    this.stepService.setStep(15)
  }

  ngOnInit(): void {
  }

}
