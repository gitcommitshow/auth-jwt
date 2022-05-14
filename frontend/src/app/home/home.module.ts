import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

// Routes
import { HomeRoutingModule } from './home-routing.module';

// Components
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    // Components
    HomeComponent,
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    // Routes
    HomeRoutingModule,
  ],
  providers: [
  ],
  exports: [
  ],
})
export class HomeModule {
}
