import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-cookies',
  templateUrl: './dialog-cookies.page.html',
  styleUrls: ['./dialog-cookies.page.scss'],
})
export class DialogCookiesPage implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogCookiesPage>) { }

  ngOnInit() {
  }

}
