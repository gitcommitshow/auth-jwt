import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from '../shared/services/step.service';
import { DemoService } from '../shared/services/demo.service';

@Component({
  selector: 'app-send-jwt2',
  templateUrl: './send-jwt2.component.html',
  styleUrls: ['./send-jwt2.component.scss']
})
export class SendJwt2Component implements OnInit {

  token: any | null

  successText = "";
  errorText = "";

  constructor(
    private router : Router,
    private demoService : DemoService,
    private stepService: StepService
  ) { 
    this.stepService.setStep(8)
  }

  ngOnInit(): void {
    var outToken : any = localStorage.getItem('token')
    this.token = outToken
  }

  sendJwtThroughBody(value: string){
    this.demoService.remote().sendTokenViaWebFormBody(value).subscribe({
      next: (success: any)=>{
        console.log('Authenticated')
        this.errorText = "";
        this.successText = success && success.statusText ? success.statusText : "You have been successfully authenticated"
      }, error: (error: any) => {
        console.error('error:', error);
        this.successText = "";
        this.errorText = error && error.statusText ? error.statusText : "Authentication failed"
      },
    })
  }

  backStep() {
    this.stepService.setStep(7)
    this.router.navigate(['send-jwt1'])
  }

  nextStep() {
    this.stepService.setStep(9)
    this.router.navigate(['send-jwt3'])
  }
}
