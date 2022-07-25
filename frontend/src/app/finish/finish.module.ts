import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinishRoutingModule } from './finish-routing.module';
import { TranslocoModule } from '@ngneat/transloco';
import { FinishComponent } from './finish.component';


@NgModule({
  declarations: [
    FinishComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    FinishRoutingModule
  ]
})
export class FinishModule { }
