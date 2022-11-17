import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {FooterModule} from "../../../components/footer/footer.module";
import {BlogModule} from "../../../components/blog/blog.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        FooterModule,
        BlogModule
    ],
  declarations: [HomePage]
})
export class HomePageModule {}
