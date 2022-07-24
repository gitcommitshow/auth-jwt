import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendJwt1RoutingModule } from './send-jwt1-routing.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SendJwt1Component } from './send-jwt1.component'


@NgModule({
  declarations: [
    SendJwt1Component
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    SendJwt1RoutingModule
  ]
})
export class SendJwt1Module { }
