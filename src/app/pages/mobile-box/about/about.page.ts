import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../services/data/data.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onLink(link) {
    window.open(link, '_blank');
  }

  onScroll(event) {
    this.dataService.scroll(event.detail.scrollTop)
  };

}
