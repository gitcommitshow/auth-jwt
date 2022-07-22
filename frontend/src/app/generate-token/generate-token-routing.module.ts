import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateTokenComponent } from './generate-token.component';

const routes: Routes = [
  {
    path: '',
    component: GenerateTokenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateTokenRoutingModule { }
