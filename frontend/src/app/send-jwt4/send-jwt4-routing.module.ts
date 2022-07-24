import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendJwt4Component } from './send-jwt4.component';

const routes: Routes = [
  {
    path:"",
    component: SendJwt4Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendJwt4RoutingModule { }
