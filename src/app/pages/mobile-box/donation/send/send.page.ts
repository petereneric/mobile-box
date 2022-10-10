import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../../services/data/data.service";
import {ConnApiService} from "../../../../services/conn-api/conn-api.service";

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {

  private urlLithiumIonLabel = 'lithium-ion-label';

  constructor(private dataService: DataService, private connApi: ConnApiService) { }

  ngOnInit() {
  }

  onScroll(event) {
    this.dataService.scroll(event.detail.scrollTop)
  };

  onClickBattery() {
    this.connApi.getFile(this.urlLithiumIonLabel).subscribe(response => {
      console.log(response);
      let blob: any = new Blob([response], {type: 'application/pdf'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
