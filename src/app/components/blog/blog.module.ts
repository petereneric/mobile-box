import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BlogComponent} from "./blog.component";



@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    BlogComponent
  ],
  declarations: [
    BlogComponent
  ]
})
export class BlogModule { }
