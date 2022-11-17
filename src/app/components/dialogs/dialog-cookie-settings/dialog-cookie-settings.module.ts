import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogCookieSettingsComponent} from "./dialog-cookie-settings.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {MatDialogModule} from "@angular/material/dialog";
import {IonicModule} from "@ionic/angular";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        IonicModule
    ],
  declarations: [
    DialogCookieSettingsComponent
  ]
})
export class DialogCookieSettingsModule {}
