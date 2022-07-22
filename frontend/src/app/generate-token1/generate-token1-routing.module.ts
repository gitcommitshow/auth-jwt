import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateToken1Component } from './generate-token1.component';

const routes: Routes = [
  {
    path: '',
    component: GenerateToken1Component,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateToken1RoutingModule { }
