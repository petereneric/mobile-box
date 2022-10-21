import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DialogCookieSettingsComponent} from "../dialogs/dialog-cookie-settings/dialog-cookie-settings.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit() {}

  onLink(link) {
    window.open('https://'+link, '_blank');
  }

  onCookieSettings() {
    const dialogRef = this.dialog.open(DialogCookieSettingsComponent, {
      panelClass: 'dialog-container',
      width: '80%',
      height: '9ßvh',
      data: {}
    })

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    })
  }
}
