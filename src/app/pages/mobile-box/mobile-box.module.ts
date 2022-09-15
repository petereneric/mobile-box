import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileBoxPageRoutingModule } from './mobile-box-routing.module';

import { MobileBoxPage } from './mobile-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileBoxPageRoutingModule,
  ],
  declarations: [MobileBoxPage]
})
export class MobileBoxPageModule {}
