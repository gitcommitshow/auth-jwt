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
    this.token = value
    this.demoService.remote().postFromBody(value).subscribe({
      next: (success: any)=>{
        console.log('yes')
      }, error: (error: any) => {
        console.error('error:', error);
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
