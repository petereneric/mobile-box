import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-mobile-box',
  templateUrl: './mobile-box.page.html',
  styleUrls: ['./mobile-box.page.scss'],
})
export class MobileBoxPage implements OnInit {

  // variables
  menuSelected = 0

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.callbackMenu().subscribe((data) => {
      switch (data) {
        case 'home':
          this.menuSelected = 0
          this.router.navigate(['mobile-box/menu/home'])
          break
        case 'donation':
          this.menuSelected = 1
          this.router.navigate(['mobile-box/menu/donation'])
          break;
        case 'collection':
          this.menuSelected = 2
          this.router.navigate(['mobile-box/menu/collection'])
          break
      }
    })
  }

  onMenu(item: number) {
    this.menuSelected = item;
  }
}
