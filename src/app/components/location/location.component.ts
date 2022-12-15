import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'location-element',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {

  @Input() oLocation

  constructor() { }

  ngOnInit() {
    console.log("location component started")
  }

}
