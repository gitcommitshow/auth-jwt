import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoutRoutingModule } from './logout-routing.module';
import { TranslocoModule } from '@ngneat/transloco';
import { LogoutComponent } from './logout.component';


@NgModule({
  declarations: [
    LogoutComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    LogoutRoutingModule
  ]
})
export class LogoutModule { }
