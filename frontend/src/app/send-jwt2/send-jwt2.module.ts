import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendJwt2RoutingModule } from './send-jwt2-routing.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SendJwt2Component } from './send-jwt2.component';


@NgModule({
  declarations: [
    SendJwt2Component
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    SendJwt2RoutingModule
  ]
})
export class SendJwt2Module { }
