import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-jwtuses',
  templateUrl: './jwtuses.component.html',
  styleUrls: ['./jwtuses.component.scss']
})
export class JwtusesComponent implements OnInit {

  constructor(private router: Router,
  private stepService: StepService) { 
    this.stepService.setStep(4)
  }

  ngOnInit(): void {
  }

  public nextStep(){
    this.stepService.setStep(5)
    this.router.navigate(['/generate-token'])
  }
}
