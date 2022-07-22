import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'anatomy',
    loadChildren: () => import('./anatomy/anatomy.module').then(mod => mod.AnatomyModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
  },
  {
    path: 'verify',
    loadChildren: () => import('./verify/verify.module').then(mod => mod.VerifyModule),
  },
  {
    path: 'jwtUses',
    loadChildren: () => import('./jwtuses/jwtuses.module').then(mod => mod.JwtusesModule),
  },
  {
    path: 'generate-token',
    loadChildren: () => import('./generate-token/generate-token.module').then(mod => mod.GenerateTokenModule),
  },
  {
    path: 'generate-token1',
    loadChildren: () => import('./generate-token1/generate-token1.module').then(mod => mod.GenerateToken1Module),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      enableTracing: false,
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
