import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemoService } from '../shared/services/demo.service';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-send-jwt4',
  templateUrl: './send-jwt4.component.html',
  styleUrls: ['./send-jwt4.component.scss']
})
export class SendJwt4Component implements OnInit {

  successText = "";
  errorText = "";

  constructor(
    private router : Router,
    private demoService: DemoService,
    private stepService: StepService
  ) { 
    this.stepService.setStep(10)
  }

  ngOnInit(): void {
  }

  getAuthorizePage(){
    this.router.navigate(['authorize'])
  }

  getProtectedUserData(){
    this.demoService.remote().webCookies().subscribe({
      next: (success: any)=>{
        console.log("success")
        this.errorText = ""
        this.successText = JSON.stringify(success, null, 4)
      },
      complete: () => console.log("Sent token in header"),
      error: (error: HttpErrorResponse) => {
        this.successText = ""
        this.errorText = error.statusText || "Unsuccessful"
        console.error('error:', error)
      }
    })
  }

  getUser(){
    this.demoService.remote().getUser().subscribe((user)=>{
      console.log(user)
    })
  }

  logOut(){
    this.demoService.remote().logOut().subscribe(success=>{
      console.log(success)
    })
  }

  backStep() {
    this.stepService.setStep(9)
    this.router.navigate(['send-jwt3'])
  }
  nextStep() {
    this.stepService.setStep(11)
    this.router.navigate(['best-method'])
  }
}
