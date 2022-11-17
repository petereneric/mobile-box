import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlogPageRoutingModule } from './blog-routing.module';

import { BlogPage } from './blog.page';
import {FooterModule} from "../../../components/footer/footer.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlogPageRoutingModule,
    FooterModule,
    MatProgressSpinnerModule
  ],
    exports: [
        BlogPage
    ],
    declarations: [BlogPage]
})
export class BlogPageModule {}
