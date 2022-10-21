import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DialogCookiesPage } from './dialog-cookies.page';

const routes: Routes = [
  {
    path: '',
    component: DialogCookiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DialogCookiesPageRoutingModule {}
