import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemoService } from '../shared/services/demo.service';
import { StepService } from '../shared/services/step.service';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-send-jwt4',
  templateUrl: './send-jwt4.component.html',
  styleUrls: ['./send-jwt4.component.scss']
})
export class SendJwt4Component implements OnInit {

  AUTH_SERVER = `${environment.server}`;
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
    window.open(this.AUTH_SERVER+"/demo/authorize", "_blank");
    // this.router.navigate(['authorize'])
  }

  getProtectedUserData(){
    this.demoService.remote().sendTokenViaWebCookies().subscribe({
      next: (success: any)=>{
        console.log("success")
        this.errorText = ""
        this.successText = JSON.stringify(success, null, 4)
      },
      complete: () => console.log("Sent token in cookies"),
      error: (error: HttpErrorResponse) => {
        this.successText = ""
        this.errorText = error.statusText || "Unsuccessful"
        console.error('error:', error)
      }
    })
  }

  getUser(){
    var token: any = localStorage.getItem('token');
    var headers = new HttpHeaders()
    .set("Content-Type", "application\/json")
    if(token) headers.set("Authorization", token);
    this.demoService.remote().getUserViaHeaderOrCookies(headers).subscribe({
      next: (success: any)=>{
        console.log("success")
        this.errorText = ""
        this.successText = JSON.stringify(success, null, 4)
      },
      complete: () => console.log("Sent token in header/cookies"),
      error: (error: HttpErrorResponse) => {
        this.successText = ""
        this.errorText = error.statusText || "Unsuccessful"
        console.error('error:', error)
      }
    })
  }

  logOut(){
    let popup = window.open(this.AUTH_SERVER+"/demo/logout", "_blank");
    setTimeout(() => popup?.close(), 1000);
    // this.demoService.remote().logOut().subscribe(success=>{
    //   console.log(success)
    // })
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
