import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BestMethodRoutingModule } from './best-method-routing.module';
import { TranslocoModule } from '@ngneat/transloco';
import { BestMethodComponent } from './best-method.component';


@NgModule({
  declarations: [
    BestMethodComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    BestMethodRoutingModule
  ]
})
export class BestMethodModule { }
