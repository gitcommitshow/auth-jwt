import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnatomyComponent } from './anatomy.component';

const routes: Routes = [
  {
    path: '',
    component: AnatomyComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AnatomyRoutingModule {
}
