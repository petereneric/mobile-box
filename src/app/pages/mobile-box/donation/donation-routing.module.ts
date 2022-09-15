import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonationPage } from './donation.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: DonationPage,
    children: [
      {
        path: 'send',
        loadChildren: () => import('./send/send.module').then( m => m.SendPageModule)
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/send',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationPageRoutingModule {}
