import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RuecksendungPageRoutingModule } from './ruecksendung-routing.module';

import { RuecksendungPage } from './ruecksendung.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RuecksendungPageRoutingModule
  ],
  declarations: [RuecksendungPage]
})
export class RuecksendungPageModule {}
