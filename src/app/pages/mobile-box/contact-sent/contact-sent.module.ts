import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactSentPageRoutingModule } from './contact-sent-routing.module';

import { ContactSentPage } from './contact-sent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactSentPageRoutingModule
  ],
  declarations: [ContactSentPage]
})
export class ContactSentPageModule {}
