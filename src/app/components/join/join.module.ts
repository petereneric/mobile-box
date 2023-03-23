import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {JoinComponent} from "./join.component";

@NgModule({
  exports: [
    JoinComponent
  ],
  declarations: [JoinComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule
  ],
})
export class JoinModule { }
