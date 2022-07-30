import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemoService } from '../shared/services/demo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  success : any

  constructor(
    private router: Router,
    private demoService: DemoService
  ) { }

  ngOnInit(): void {
  }

  login(value: any){
      this.demoService.remote().login(value).subscribe((success: any)=>{  
          this.success = success
          this.router.navigate(['send-jwt4'])
      })
  }

}
