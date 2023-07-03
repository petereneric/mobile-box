import {ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Platform} from "@ionic/angular";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {StatusBar} from "@ionic-native/status-bar/ngx";


import {NgcCookieConsentService, NgcNoCookieLawEvent, NgcInitializeEvent, NgcStatusChangeEvent} from "ngx-cookieconsent";
import { Subscription } from "rxjs";
import {Meta} from "@angular/platform-browser";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {



  constructor(private metaService: Meta, private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar) {
    this.initializeApp();
    this.metaService.updateTag({
      name: 'thumbnail',
      content: "https://www.mobile-box.eu/assets/image/phones.webp"
    })
    this.metaService.updateTag({
      name: 'description',
      content: "Mobile-Box sammelt deine alten Handys und führt diese einer umweltgerechten Verwertung zu. Einfach per Post versenden oder eine Sammelaktion starten!"
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {


  }

}
