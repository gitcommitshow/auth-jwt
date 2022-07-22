import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateToken1RoutingModule } from './generate-token1-routing.module';
import { GenerateToken1Component } from './generate-token1.component';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [
    GenerateToken1Component
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    GenerateToken1RoutingModule
  ]
})
export class GenerateToken1Module { }
