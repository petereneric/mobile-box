import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileBoxPage } from './mobile-box.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MobileBoxPage,
    children: [
      {
        path: 'über-uns',
        loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
      },
      {
        path: 'sammelaktion-starten',
        loadChildren: () => import('./collection/collection.module').then( m => m.CollectionPageModule)
      },
      {
        path: 'handys-spenden',
        loadChildren: () => import('./donation/donation.module').then( m => m.DonationPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'impressum',
        loadChildren: () => import('./impressum/impressum.module').then( m => m.ImpressumPageModule)
      },
      {
        path: 'datenschutzerklärung',
        loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
      },
      {
        path: 'kontakt',
        loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
      },
      {
        path: 'ruecksendung',
        loadChildren: () => import('./ruecksendung/ruecksendung.module').then( m => m.RuecksendungPageModule)
      },
    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileBoxPageRoutingModule {}
