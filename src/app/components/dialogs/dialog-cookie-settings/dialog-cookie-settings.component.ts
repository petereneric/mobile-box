import {Component, Inject, OnInit} from '@angular/core';
import {CookieCategory} from '../../interfaces/cookieCategory'
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-cookie-settings',
  templateUrl: './dialog-cookie-settings.component.html',
  styleUrls: ['./dialog-cookie-settings.component.scss'],
})
export class DialogCookieSettingsComponent implements OnInit {

  // data
  lSettings: CookieCategory[] = null
  oCategory: CookieCategory = null

  bActive: boolean = true
  bShowCookieList = false
  bShowCookies = false

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.lSettings = JSON.parse(localStorage.getItem("cookieSettings"))
    if (localStorage.getItem("cookieAcceptAll") == "true") {
      this.acceptAll()
      this.saveSettings()
    }

    this.oCategory = this.lSettings[0]
  }

  selectCategory(index) {
    this.bShowCookies = false;
    this.bShowCookieList = false;
    this.oCategory = this.lSettings[index]
  }


  onToggleSettings($event: any) {
    this.oCategory.bActive = $event['detail']['checked'];
    this.saveSettings()
    this.setCookiesAccepted()
  }

  onCookieDetails() {
    this.bShowCookieList = !this.bShowCookieList
  }

  onCookieList() {
    this.bShowCookies = !this.bShowCookies
  }

  saveSettings() {
    localStorage.setItem("cookieSettings", JSON.stringify(this.lSettings))
  }

  acceptAll() {
    for (let cookieCategory of this.lSettings) {
      cookieCategory.bActive = true
    }
    this.saveSettings()
    this.setCookiesAccepted()

  }

  onAcceptAll() {
    this.acceptAll()
    this.dialogRef.close();
  }

  cookiesAccepted() {
    console.log((!(localStorage.getItem("cookieAcceptAll") != null && localStorage.getItem("cookieAcceptAll") != undefined) && localStorage.getItem("cookieAcceptAll") === "true"))
    return ((localStorage.getItem("cookieAcceptAll") != null && localStorage.getItem("cookieAcceptAll") != undefined) && localStorage.getItem("cookieAcceptAll") === "true")
  }

  setCookiesAccepted() {
    for (let cookieCategory of this.lSettings) {
      if (!cookieCategory.bActive) {
        localStorage.setItem("cookieAcceptAll", "false")
        return
      }
    }
    localStorage.setItem("cookieAcceptAll", "true")
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
