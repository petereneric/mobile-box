import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {HttpClientModule} from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import {NgcCookieConsentConfig, NgcCookieConsentModule} from 'ngx-cookieconsent';
import {MatDialogModule} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {DialogCookieSettingsModule} from "./components/dialogs/dialog-cookie-settings/dialog-cookie-settings.module";
import { MCSignupFormComponent } from './components/dialogs/mc-signup-form/mc-signup-form.component';



@NgModule({
  declarations: [AppComponent, MCSignupFormComponent],
  imports: [DialogCookieSettingsModule, CommonModule, MatDialogModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, RouterModule, HttpClientModule],
  providers: [StatusBar, SplashScreen, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },],
  bootstrap: [AppComponent],
})
export class AppModule {}
