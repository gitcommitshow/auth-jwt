import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendJwt1Component } from './send-jwt1.component';

const routes: Routes = [
  {
    path: '',
    component: SendJwt1Component,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendJwt1RoutingModule { }
