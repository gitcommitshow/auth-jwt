import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendJwt3RoutingModule } from './send-jwt3-routing.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SendJwt3Component } from './send-jwt3.component';


@NgModule({
  declarations: [
    SendJwt3Component
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    SendJwt3RoutingModule
  ]
})
export class SendJwt3Module { }
