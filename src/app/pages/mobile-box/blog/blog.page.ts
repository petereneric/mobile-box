import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {ConnApiService} from "../../../services/conn-api/conn-api.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
  providers: [DatePipe]
})
export class BlogPage implements OnInit {

  // data
  oBlog = null
  bLoading = false;

  // urls
  urlBlog = "blog/"

  constructor(private datePipe: DatePipe, private route: ActivatedRoute, private connApi: ConnApiService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.name != null && params.name != 0) {
        this.bLoading = true;
        this.connApi.get(this.urlBlog + params.name).subscribe((response: HttpResponse<any>) => {
            console.log(response)
            this.oBlog = response.body;
            this.bLoading = false;
        });
      }
    }, error => {
      console.log(error)
    });
  }


  getPathImage() {
    if (this.oBlog != null) {
      return "../../../assets/image/blog/"+this.oBlog.id+".webp"
    } else {
      return "../../../assets/image/forest.webp"
    }
  }

  getDate() {
    return this.datePipe.transform(this.oBlog?.dCreation, 'dd.MM.yy')
  }

}
