import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mobile-box',
    pathMatch: 'full'
  },
  {
    path: 'mobile-box',
    loadChildren: () => import('./pages/mobile-box/mobile-box.module').then( m => m.MobileBoxPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
