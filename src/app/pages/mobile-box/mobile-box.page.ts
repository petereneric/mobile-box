import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../services/data/data.service";
import {MatDialog} from "@angular/material/dialog";
import { DialogCookieSettingsComponent } from 'src/app/components/dialogs/dialog-cookie-settings/dialog-cookie-settings.component';

@Component({
  selector: 'app-mobile-box',
  templateUrl: './mobile-box.page.html',
  styleUrls: ['./mobile-box.page.scss'],
})
export class MobileBoxPage implements OnInit {

  // variables
  menuSelected = 0
  bMenuVertical = false

  menuHeightFix = 4
  menuHeightFlex = 2
  menuHeight = this.menuHeightFix + this.menuHeightFlex

  menuOpacityFix = 0.75
  menuOpacityFlex = 0.25
  menuOpacity = this.menuOpacityFix + this.menuOpacityFlex;

  constructor(private dialog: MatDialog, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.setCookiesDefault()

    console.log("jjooo: " + this.router.url)
    switch (this.router.url) {
      case '/handys-spenden/versenden':
      case '/handys-spenden/abgeben':
        this.menuSelected = 1
      case '/sammelaktion-starten':
        this.menuSelected = 2
      case '/%C3%BCber-uns':
        this.menuSelected = 3
    }

    this.dataService.callbackMenu().subscribe((data) => {
      switch (data) {
        case 'home':
          this.menuSelected = 0
          this.router.navigate(['home'])
          break
        case 'handys-spenden':
          this.menuSelected = 1
          this.router.navigate(['handys-spenden'])
          break;
        case 'sammelaktion-starten':
          this.menuSelected = 2
          this.router.navigate(['sammelaktion-starten'])
          break
      }
    })
    this.dataService.callbackScroll().subscribe((scroll) => {
      console.log(scroll)
      if (scroll <= 200) {
        this.menuHeight = (this.menuHeightFix + (this.menuHeightFlex * (1-scroll/200)))
        this.menuOpacity = (this.menuOpacityFix + (this.menuOpacityFlex * (1-scroll/200)))
        console.log(this.menuHeight)
      } else {
        this.menuHeight = this.menuHeightFix
        this.menuOpacity = this.menuOpacityFix
      }
    })
  }

  // @HostListener('scroll', ['$event']) // for scroll events of the current element
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(e) {
    console.log(this.getYPosition(e));
  }

  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }

  onMenu(item: number) {
    this.bMenuVertical = false
    this.menuSelected = item
    this.menuHeight = 6
    this.menuOpacity = 1
  }

  onMenuToggle() {
    this.bMenuVertical = !this.bMenuVertical
  }

  onCookieSettings() {
    localStorage.setItem("cookieAcceptAll", "false")
       const dialogRef = this.dialog.open(DialogCookieSettingsComponent, {
         panelClass: 'dialog-container',
         width: '80%',
         height: '9ßvh',
         data: {},
       })

       dialogRef.afterClosed().subscribe(result => {
         window.location.reload();
       })
  }

  onCookieAccept() {
    localStorage.setItem("cookieAcceptAll", "true")
  }

  cookiesAccepted() {
    return (localStorage.getItem("cookieAcceptAll") != null && localStorage.getItem("cookieAcceptAll") != undefined)
  }

  setCookiesDefault() {
    if (localStorage.getItem("cookieSettings") == null || localStorage.getItem("cookieSettings") == undefined) {
      let lSettings =  [
        {id: 0, cName: "Privatsphäre", cText: "Wenn Du eine Website besuchst, kann diese Informationen über deinen Browser abrufen oder speichern. Dies geschieht meist in Form von Cookies. " +
            "Hierbei kann es sich um Informationen über Dich, deine Einstellungen oder dein Gerät handeln. Meist werden die Informationen verwendet, um die erwartungsgemäße Funktion der Website zu gewährleisten. " +
            "Durch diese Informationen wirst Du in den meisten Fällen nicht direkt identifiziert." +
            "Klicke auf die verschiedenen Kategorieüberschriften, um mehr zu erfahren und unsere Standardeinstellungen zu ändern.", bActive: true, lCookieList: []},
        {id: 1, cName: "Notwendige Cookies", cText: "Diese Cookies sind notwendig, damit die Webseite richtig funktioniert und können in unseren Systemen nicht abgeschaltet werden. " +
            "Diese Cookies werden normalerweise als Reaktion auf Dienstleistungsanforderungen gespeichert, zum Beispiel beim Einstellen deiner Datenschutzeinstellungen, beim Anmelden oder beim Ausfüllen von Formularen. " +
            "Diese Cookies speichern keinerlei persönliche Informationen, mit denen Du identifiziert werden könntest.", bActive: true, lCookieList: []},
        {id: 2, cName: "Messung", cText: "Mit diesen Cookies zählen wir Besuche und Traffic-Quellen, sodass wir unsere Seitenperformance verbessern können. Sie helfen uns dabei zu erfahren, welche Seiten häufig angeklickt werden und wie Besucher sich auf unserer Seite bewegen. ", bActive: false, lCookieList: [{cName: "google.com", lCookies: [{cName: "_GRECAPTCHA", cDuration: "365 Tage", cCategory: "Messung"}]}]},
      ]
      localStorage.setItem("cookieSettings", JSON.stringify(lSettings))
    }
  }
}
