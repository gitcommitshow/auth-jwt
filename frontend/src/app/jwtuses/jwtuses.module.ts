import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JwtusesRoutingModule } from './jwtuses-routing.module';
import { JwtusesComponent } from './jwtuses.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    JwtusesComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    JwtusesRoutingModule
  ]
})
export class JwtusesModule { }
