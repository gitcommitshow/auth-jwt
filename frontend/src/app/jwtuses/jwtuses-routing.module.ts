import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtusesComponent } from './jwtuses.component';

const routes: Routes = [
  {
    path: '',
    component: JwtusesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JwtusesRoutingModule { }
