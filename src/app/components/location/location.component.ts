import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'location-element',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {

  @Input() oLocation;
  @Output() ping: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  ngOnInit() {
    console.log("location component started");
  }

  onClick() {
    const event = {
      oLocation: this.oLocation
    }
    this.ping.emit(event)
  }

  onLink(link: string) {
    window.open((!(link.substring(0, 8) === "https://") ? "https://" : "") + link, '_blank');
  }
}
