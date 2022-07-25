import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BestMethodComponent } from './best-method.component';

const routes: Routes = [
  {
    path:"",
    component: BestMethodComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BestMethodRoutingModule { }
