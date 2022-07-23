import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendJwt4RoutingModule } from './send-jwt4-routing.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SendJwt4Component } from './send-jwt4.component';


@NgModule({
  declarations: [
    SendJwt4Component
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    SendJwt4RoutingModule
  ]
})
export class SendJwt4Module { }
