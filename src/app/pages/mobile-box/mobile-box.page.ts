import {Component, HostListener, OnInit} from '@angular/core';
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
  bMenuVertical = false

  menuHeightFix = 4
  menuHeightFlex = 2
  menuHeight = this.menuHeightFix + this.menuHeightFlex

  menuOpacityFix = 0.75
  menuOpacityFlex = 0.25
  menuOpacity = this.menuOpacityFix + this.menuOpacityFlex;

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
}
