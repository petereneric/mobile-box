import {Component, OnInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import {ConnApiService} from "../../../services/conn-api/conn-api.service";
import {HttpResponse} from "@angular/common/http";
import { Alert } from 'src/app/utilities/alert';
import { DataService } from 'src/app/services/data/data.service';
import {Router} from "@angular/router";
import {Numbers} from "../../../utilities/numbers";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [Alert, Numbers],
})
export class HomePage implements OnInit {

  // Urls
  urlStatisticsOverview = "statistics/overview"

  // data
  testNumber = 1112
  oStatisticsOverview = null;
  oStatisticsOverviewTest = null;

  oBundNrw = null;
  oKoelnerZoo = null;
  oFoej = null;
  oDuh = null;


  constructor(private uNumbers: Numbers, private router: Router, private dataService: DataService, private connApi: ConnApiService, public Alert: Alert) {
  }

  ngOnInit() {
    let json = {}

    this.connApi.post(this.urlStatisticsOverview, json).subscribe((response: HttpResponse<any>) => {
      this.oStatisticsOverview = response.body;
      console.log(this.oStatisticsOverview)
    })

    this.loadDataPartner()
  }



  onScroll(event) {
    this.dataService.scroll(event.detail.scrollTop)
  };


  loadDataPartner() {
    this.loadDataBundNrw()
    this.loadDataKoelnerZoo()
    this.loadDataFoej()
    this.loadDataDuh()
  }

  loadDataBundNrw() {
    let json = {kPayee : 10}

    this.connApi.post(this.urlStatisticsOverview, json).subscribe((response: HttpResponse<any>) => {
      this.oBundNrw = response.body
      console.log(this.oBundNrw)
    })
  }

  loadDataKoelnerZoo() {
    let json = {kPayee : 7}
    this.connApi.post(this.urlStatisticsOverview, json).subscribe((response: HttpResponse<any>) => {
      this.oKoelnerZoo = response.body
    })
  }

  loadDataFoej() {
    let json = {kPayee : 8}
    this.connApi.post(this.urlStatisticsOverview, json).subscribe((response: HttpResponse<any>) => {
      this.oFoej = response.body
    })
  }

  loadDataDuh() {
    let json = {kPayee : 6}
    this.connApi.post(this.urlStatisticsOverview, json).subscribe((response: HttpResponse<any>) => {
      this.oDuh = response.body
    })
  }

  get_nDevices() {
    if (this.oStatisticsOverview != null) {
      return this.oStatisticsOverview.nDevices;
    } else {
      return "-"
    }
  }

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

  transKilogramm(nKilogramm) {
    if (nKilogramm != null) {
      let weight = {
        value: nKilogramm,
        unit: 'kg'
      }
      if (weight.value / 1000 >= 1) {
        weight.value = nKilogramm / 1000
        weight.unit = 'T'
      }

      weight.value = parseFloat(weight.value).toFixed(2).replace('.', ',');
      return weight;
    } else {
      return "-"
    }
  }

  onContact() {
    this.Alert.contact()
  }

  onMenu(page) {
    this.dataService.callMenu(page)
  }
}
