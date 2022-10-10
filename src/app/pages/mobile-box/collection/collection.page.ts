import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../services/data/data.service";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onLink(link) {
    window.open('https://'+link, '_blank');
  }

  onScroll(event) {
    this.dataService.scroll(event.detail.scrollTop)
  };
}
