import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisclosuresComponent } from './disclosures.component';

const routes: Routes = [
  {
    path:"",
    component: DisclosuresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisclosuresRoutingModule { }
