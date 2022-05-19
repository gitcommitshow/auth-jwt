import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

// Routes
import { AnatomyRoutingModule } from './anatomy-routing.module';

// Components
import { AnatomyComponent } from './anatomy.component';

@NgModule({
  declarations: [
    // Components
    AnatomyComponent,
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    // Routes
    AnatomyRoutingModule,
  ],
  providers: [
  ],
  exports: [
  ],
})
export class AnatomyModule {
}
