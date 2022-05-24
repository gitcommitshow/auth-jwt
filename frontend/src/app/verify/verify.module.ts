import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

// Routes
import { VerifyRoutingModule } from './verify-routing.module';

// Components
import { VerifyComponent } from './verify.component';

@NgModule({
  declarations: [
    // Components
    VerifyComponent,
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    // Routes
    VerifyRoutingModule,
  ],
  providers: [
  ],
  exports: [
  ],
})
export class VerifyModule {
}
