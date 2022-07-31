import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../shared/services/jwt.service';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.scss']
})
export class GenerateTokenComponent implements OnInit {

  payloadValue = '{ "data" : "We raised series A" }'
  algo ="RS256"

  @Input() token = ""
  
  constructor(private router: Router,
    private jwtService: JwtService,
    private stepService: StepService) {
      this.stepService.setStep(5)
     }

  ngOnInit(): void {
  }

  onCreateToken(postData: {algo: string, payload: string}){
      console.log("Creating token for: "+JSON.stringify(postData));
      this.jwtService.post(postData).subscribe({
        next: (success: any)=>{
          this.token = success.token
          localStorage.setItem('token', this.token);
          this.nextStep();
        }, error: (error: any) => {
          console.error('error:', error);
        },
      })
  }

  nextStep(){
    this.stepService.setStep(5)
    this.router.navigate(['generate-token1'])
  }

}
