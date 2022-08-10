import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { JwtService } from '../shared/services/jwt.service';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-anatomy',
  templateUrl: './anatomy.component.html',
  styleUrls: ['./anatomy.component.scss'],
})
export class AnatomyComponent implements OnInit {

  showToken: boolean;
  jwtHeader: string;
  jwtHeaderShort: string;
  jwtHeaderDecoded: string;
  decodeHeader: boolean;
  jwtPayload: string;
  jwtPayloadShort: string;
  jwtPayloadDecoded: string;
  decodePayload: boolean;
  jwtSignature: string;
  jwtSignatureShort: string;
  token: string;


  tokenSubmitted: boolean = false
  editToken : boolean = false;
  generatedToken : string | any
  errorMessage: string | any

  constructor(private router: Router,
              private jwtService: JwtService,
              private stepService: StepService) {
    this.stepService.setStep(2);
    this.showToken = false;
    this.jwtHeader = '';
    this.jwtHeaderShort = '';
    this.jwtHeaderDecoded = '';
    this.decodeHeader = false;
    this.jwtPayload = '';
    this.jwtPayloadShort = '';
    this.jwtPayloadDecoded = '';
    this.decodePayload = false;
    this.jwtSignature = '';
    this.jwtSignatureShort = '';
    this.token = 'b3NvZnQuY29tIiwiaXNzIjoiTWljcm9zb2Z0IEluYyIsInN1YiI6ISsexmjDXssxZ84TWV34KJNUA36EHs3Ew5Pcn5N6_UechJ2MTvUaXyR6JrqdWjw8RuXBmAfkEpizST9jPKybTRWzJlqmr-QErpluTIJyonvHmd8FXACADS';
  }

  ngOnInit(): void {
    this.load();
  }

  public load(): void {
    this.jwtService.get()
    .subscribe({
      next: (success: any) => {
        if (success && success.token) {
          if(this.tokenSubmitted){
            let checkToken = this.generatedToken.match(/\./g)
            let checkTokenResult = checkToken != null && checkToken.length == 2  ? true : false
            if(checkTokenResult){
              success.token = this.generatedToken
            } else {
                this.errorMessage = 'Provided token is not valid please provide a valid token'
            }
          }
          const tokenSplitted = success.token.split('.');
          this.jwtHeader = tokenSplitted[0];
          this.jwtHeaderShort = `${this.jwtHeader.substring(0, 6)}...${this.jwtHeader.substring(this.jwtHeader.length-6, this.jwtHeader.length)}`;
          this.jwtPayload = tokenSplitted[1];
          this.jwtPayloadShort = `${this.jwtPayload.substring(0, 6)}...${this.jwtPayload.substring(this.jwtPayload.length-6, this.jwtPayload.length)}`;
          this.jwtSignature = tokenSplitted[2];
          this.jwtSignatureShort = `${this.jwtSignature.substring(0, 6)}...${this.jwtSignature.substring(this.jwtSignature.length-6, this.jwtSignature.length)}`;
          this.jwtHeaderDecoded = JSON.stringify(JSON.parse(window.atob(this.jwtHeader)), null, 4);
          this.jwtPayloadDecoded = JSON.stringify(JSON.parse(window.atob(this.jwtPayload)), null, 4);
        }
      }, error: (error: any) => {
        console.error('error:', error);
      },
    });
  }

  public editMode(): void {
    this.editToken = true
    this.tokenSubmitted = false
  }

  public submitToken(){
    this.tokenSubmitted = true
    this.load()
    if(this.editToken === true){
      this.editToken = false
    }
  }
  // @HostListener('document:click', ['$event'])
  //   documentClick(event: MouseEvent) {
  //       // your click logic
  //       if(this.editToken && this.tokenSubmitted){
  //           this.submitToken()
  //       }
  //   }

  public nextStep(): void {
    this.stepService.setStep(3);
    this.router.navigate(['/verify']);
  }

}
