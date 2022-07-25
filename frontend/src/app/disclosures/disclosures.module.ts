import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisclosuresRoutingModule } from './disclosures-routing.module';
import { DisclosuresComponent } from './disclosures.component';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [
    DisclosuresComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    DisclosuresRoutingModule
  ]
})
export class DisclosuresModule { }
