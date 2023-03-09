import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
})
export class JoinComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {}

  onMenu(page) {
    this.dataService.callMenu(page)
  }

  onContact() {
    this.router.navigate(['/kontakt'])
  }

  onSubscribe() {
    this.onLink("http://eepurl.com/icNgpX")
  }

  onLink(link) {
    window.open(link, '_blank');
  }

}
