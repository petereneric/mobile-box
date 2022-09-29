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
        path: 'about',
        loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
      },
      {
        path: 'collection',
        loadChildren: () => import('./collection/collection.module').then( m => m.CollectionPageModule)
      },
      {
        path: 'donation',
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
        path: 'privacy',
        loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileBoxPageRoutingModule {}
