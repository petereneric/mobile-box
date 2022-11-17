import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactSentPage } from './contact-sent.page';

const routes: Routes = [
  {
    path: '',
    component: ContactSentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactSentPageRoutingModule {}
