import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact-sent',
  templateUrl: './contact-sent.page.html',
  styleUrls: ['./contact-sent.page.scss'],
})
export class ContactSentPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onStartPage() {
    this.router.navigate(['/'])
  }
}
