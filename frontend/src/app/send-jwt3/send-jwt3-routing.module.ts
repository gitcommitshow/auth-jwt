import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendJwt3Component } from './send-jwt3.component';

const routes: Routes = [
  {
    path:"",
    component: SendJwt3Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendJwt3RoutingModule { }
