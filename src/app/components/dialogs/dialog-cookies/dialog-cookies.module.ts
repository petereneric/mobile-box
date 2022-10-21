import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DialogCookiesPageRoutingModule } from './dialog-cookies-routing.module';

import { DialogCookiesPage } from './dialog-cookies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DialogCookiesPageRoutingModule
  ],
  declarations: [DialogCookiesPage]
})
export class DialogCookiesPageModule {}
