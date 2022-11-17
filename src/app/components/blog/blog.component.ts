import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {EventpingBlog} from "../interfaces/eventpingBlog";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  providers: [DatePipe]
})
export class BlogComponent implements OnInit {

  // Communication
  @Input() oBlog: any;
  @Output() ping: EventEmitter<any> = new EventEmitter<any>()

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {

  }

  getPathImage() {
    if (this.oBlog != null) {
      return "../../../assets/image/blog/"+this.oBlog.id+".webp"
    } else {
      return ""
    }
  }

  getDate() {
    if (this.oBlog != null) {
      return this.datePipe.transform(this.oBlog.dCreation, 'dd.MM.yyyy')
    } else {
      return "..."
    }

  }

  onClick() {
    const eventObject: EventpingBlog = {
      label: 'click',
      object: this.oBlog
    }
    this.ping.emit(eventObject)
  }
}
