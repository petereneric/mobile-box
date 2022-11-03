import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LocationComponent} from "./location.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [LocationComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
  exports: [
    LocationComponent
  ]
})

export class LocationModule { }
