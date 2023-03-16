import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DataService} from "../../../services/data/data.service";
import {ConnApiService} from "../../../services/conn-api/conn-api.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {

  // urls
  urlStatisticsMonth = "collection/statistics/month"

  // data
  lData = []

  constructor(private changeDetecRef: ChangeDetectorRef, private connApi: ConnApiService, private dataService: DataService) { }

  ngOnInit() {
    console.log("hier bin ich")
    this.connApi.get(this.urlStatisticsMonth).subscribe((response: HttpResponse<any>) => {
      this.lData = response.body
      console.log("loaded from server")
      console.log(this.lData)
    })
    console.log("after method")
  }

  onLink(link) {
    window.open('https://'+link, '_blank');
  }

  onScroll(event) {
    this.dataService.scroll(event.detail.scrollTop)
  };

  transGramm(nGramm) {
    let weight = {
      value: nGramm,
      unit: 'g'
    }
    if (weight.value / 1000 >= 1) {
      weight.value = nGramm / 1000
      weight.unit = 'kg'
      if (weight.value / 1000 >= 1) {
        weight.value = weight.value / 1000
        weight.unit = 'Tonnen'
      }
    }

    weight.value = parseFloat(weight.value).toFixed(0).replace('.', ',');
    return weight;

  }
}
