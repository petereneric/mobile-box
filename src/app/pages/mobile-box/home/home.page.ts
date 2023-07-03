import {Component, OnInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import {ConnApiService} from "../../../services/conn-api/conn-api.service";
import {HttpResponse} from "@angular/common/http";
import { Alert } from 'src/app/utilities/alert';
import { DataService } from 'src/app/services/data/data.service';
import {Router} from "@angular/router";
import {Numbers} from "../../../utilities/numbers";
import {EventpingBlog} from "../../../components/interfaces/eventpingBlog";
import {Blog} from "../../../components/interfaces/blog";

import {MatDialog} from "@angular/material/dialog";
import {MCSignupFormComponent} from "../../../components/dialogs/mc-signup-form/mc-signup-form.component";
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [Alert, Numbers],
})
export class HomePage implements OnInit {

  // Urls
  urlStatisticsOverview = "statistics/overview"
  urlSammelstandorte = "locations/statistics"
  urlBlog = "blog"

  // data
  testNumber = 1112
  oStatisticsOverview = null;
  oStatisticsOverviewTest = null;

  oSammelstandorte = null;

  oExperience = null;
  currentYear = null;

  oBundNrw = null;
  oKoelnerZoo = null;
  oFoej = null;
  oDuh = null;

  lBlog = null;

  cTotalResources = null;


  constructor(private metaService: Meta, public uNumbers: Numbers, private router: Router, private dataService: DataService, private connApi: ConnApiService, private dialogRef: MatDialog ,public Alert: Alert) {
    this.metaService.updateTag({
      name: 'thumbnail',
      content: "https://www.mobile-box.eu/assets/image/phones.webp"
    })
    this.metaService.updateTag({
      name: 'description',
      content: "Mobile-Box sammelt deine alten Handys und führt diese einer umweltgerechten Verwertung zu. Einfach per Post versenden oder eine Sammelaktion starten!"
    })
  }

  ngOnInit() {
    let json = {}

    this.connApi.post(this.urlStatisticsOverview, json).subscribe((response: HttpResponse<any>) => {
      this.oStatisticsOverview = response.body;
      console.log(this.oStatisticsOverview)
    })

    this.connApi.get(this.urlSammelstandorte).subscribe((response: HttpResponse<any>) => {
      this.oSammelstandorte = response.body.nLocationsPublic;
      console.log(this.oSammelstandorte)
    })


    this.loadDataPartner()
    this.loadBlog()

    this.getDate()
  }

  openSignupForm(){
    console.log("callOne")
    this.dialogRef.open(MCSignupFormComponent, {
    })
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

  loadBlog() {
    this.connApi.get(this.urlBlog).subscribe((response: HttpResponse<any>) => {
      this.lBlog = response.body;
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

  getResources(){

    if (this.oStatisticsOverview != null) {
      var weightGold = this.oStatisticsOverview.gGold
      var weightSilver = this.oStatisticsOverview.gSilver
      var weightCopper = this.oStatisticsOverview.gCopper

      this.cTotalResources = Number(weightGold) + Number(weightCopper) + Number(weightSilver)

      let resources = this.transGramm(this.cTotalResources)
      return resources.value + " " + resources.unit
    } else {
      return "-"
    }

}
 getDate(){
    this.currentYear = new Date().getFullYear();
    console.log(this.currentYear)

   this.oExperience = Number(this.currentYear) - 2012;

  }

  onContact() {
    this.router.navigate(['/kontakt'])
  }

  onMenu(page) {
    this.dataService.callMenu(page)
  }

  onLink(link) {
    window.open(link, '_blank');
  }

  onBlog($event: EventpingBlog) {
    let oBlog: Blog = $event.object
    switch ($event.label) {
      case 'click':
      this.router.navigate(['/blog/'+oBlog.cTitle.replace(/\s/g, '_')])
    }
  }

  onSubscribe() {
    this.onLink("http://eepurl.com/icNgpX")
  }
}
