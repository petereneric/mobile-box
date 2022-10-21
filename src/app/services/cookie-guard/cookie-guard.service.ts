import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogCookiesPage} from "../../components/dialogs/dialog-cookies/dialog-cookies.page";
import {DialogCookieSettingsComponent} from "../../components/dialogs/dialog-cookie-settings/dialog-cookie-settings.component";

@Injectable({
  providedIn: 'root'
})
export class CookieGuardService {

  constructor(private dialog: MatDialog) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

    return new Promise((resolve) => {
      let oCookies = localStorage.getItem('oCookies');

      if (oCookies == undefined || oCookies == null) {
        // open Dialog
        console.log("open dialogCookies")
        /*
        const dialogRef = this.dialog.open(DialogCookieSettingsComponent, {
          panelClass: 'dialog-container',
          width: '80%',
          height: '9ßvh',
          data: {}
        })

        dialogRef.afterClosed().subscribe(result => {
          window.location.reload();
        })
         */
        resolve(true)
      } else {
        resolve(true)
      }
    })
  }
}
