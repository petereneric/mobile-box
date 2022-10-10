import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RuecksendungPage } from './ruecksendung.page';

const routes: Routes = [
  {
    path: '',
    component: RuecksendungPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RuecksendungPageRoutingModule {}
