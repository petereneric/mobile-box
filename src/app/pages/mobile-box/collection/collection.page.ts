import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onLink(link) {
    window.open('https://'+link, '_blank');
  }
}
