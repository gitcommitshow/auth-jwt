import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemoService } from '../shared/services/demo.service';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-send-jwt1',
  templateUrl: './send-jwt1.component.html',
  styleUrls: ['./send-jwt1.component.scss']
})
export class SendJwt1Component implements OnInit {

  constructor(
    private router: Router,
    private demoService: DemoService,
    private stepService: StepService
  ) { 
    this.stepService.setStep(7)
  }
  
  ngOnInit(): void {
  }

  successText = "";
  errorText = "";

  sendJwtThroughRequestParameter(){
    var myToken = localStorage.getItem('token')
    this.demoService.remote().sendTokenViaRequestParam(myToken).subscribe({
      next: (success: any)=>{
        console.log("success")
        this.errorText = ""
        this.successText = success && success.statusText ? success.statusText : "Authenticated"
      },
      complete: () => console.log("Sent token in request parameter"),
      error: (error: HttpErrorResponse) => {
        this.successText = "";
        this.errorText = error.statusText || "Unsuccessful"
        console.error('error:', error)
      },
    })
  }

  backStep() {
    this.stepService.setStep(6)
    this.router.navigate(['generate-token1'])
  }
  nextStep(){
    this.stepService.setStep(8)
    this.router.navigate(['send-jwt2'])
  }
}
