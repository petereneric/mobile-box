import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {CookieGuardService} from "./services/cookie-guard/cookie-guard.service";

const routes: Routes = [
  {
    path: '',
    canActivate: [CookieGuardService],
    loadChildren: () => import('./pages/mobile-box/mobile-box.module').then(m => m.MobileBoxPageModule)
  },
  {
    path: '**',
    redirectTo: ''
  },
  {
    path: 'dialog-cookies',
    loadChildren: () => import('./components/dialogs/dialog-cookies/dialog-cookies.module').then( m => m.DialogCookiesPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
