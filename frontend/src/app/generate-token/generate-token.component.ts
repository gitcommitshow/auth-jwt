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

  @Input() token = ""
  
  constructor(private router: Router,
    private jwtService: JwtService,
    private stepService: StepService) {
      this.stepService.setStep(5)
     }

  ngOnInit(): void {
  }

  onCreateToken(postData: {algo: string, payload: string}){
      this.jwtService.post(postData).subscribe({
        next: (success: any)=>{
          this.token = success.token
          localStorage.setItem('token', this.token)
        }, error: (error: any) => {
          console.error('error:', error);
        },
      })
  }

  nextStep(){
    this.onCreateToken
    this.stepService.setStep(5)
    this.router.navigate(['generate-token1'])
  }

}
