import { Component, OnInit } from '@angular/core';

import { JwtService } from '../shared/services/jwt.service';
import { StepService } from '../shared/services/step.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {

  jwtDecoded: string;

  constructor(private jwtService: JwtService,
              private stepService: StepService) {
    this.stepService.setStep(3);
    this.jwtDecoded = '';
  }

  ngOnInit(): void {
    this.load();
  }

  public load(): void {
    this.jwtService.get()
    .subscribe({
      next: (successToken: any) => {
        console.debug('success:', successToken);
        if (successToken && successToken.token) {
          this.jwtService.verifyToken(successToken.token)
          .subscribe({
            next: (successDecoded: any) => {
              console.debug('successDecoded:', successDecoded);
              if (successDecoded && successDecoded.decodedToken) {
                this.jwtDecoded = JSON.stringify(successDecoded.decodedToken);
              }
            }, error: (error: any) => {
              console.error('error:', error);
            },
          });
        }
      }, error: (error: any) => {
        console.error('error:', error);
      },
    });
  }

  public nextStep(): void {
    this.stepService.setStep(2);
  }

}
