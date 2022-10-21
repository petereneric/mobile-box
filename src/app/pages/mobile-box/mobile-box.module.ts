import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileBoxPageRoutingModule } from './mobile-box-routing.module';

import { MobileBoxPage } from './mobile-box.page';
import {MatDialogModule} from "@angular/material/dialog";
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    IonicModule,
    MobileBoxPageRoutingModule,
  ],
  declarations: [MobileBoxPage]
})
export class MobileBoxPageModule {}
