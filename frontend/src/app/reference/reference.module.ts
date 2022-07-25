import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferenceRoutingModule } from './reference-routing.module';
import { TranslocoModule } from '@ngneat/transloco';
import { ReferenceComponent } from './reference.component';


@NgModule({
  declarations: [
    ReferenceComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    ReferenceRoutingModule
  ]
})
export class ReferenceModule { }
