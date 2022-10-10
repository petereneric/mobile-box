import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonationPage } from './donation.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'versenden',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DonationPage,
    children: [
      {
        path: 'versenden',
        loadChildren: () => import('./send/send.module').then( m => m.SendPageModule)
      },
      {
        path: 'abgeben',
        loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationPageRoutingModule {}
