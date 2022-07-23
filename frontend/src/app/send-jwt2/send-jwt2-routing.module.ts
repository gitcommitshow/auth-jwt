import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendJwt2Component } from './send-jwt2.component';

const routes: Routes = [
  {
    path: '',
    component: SendJwt2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendJwt2RoutingModule { }
