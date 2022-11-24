import { Component, OnInit } from '@angular/core';
import {ConnApiService} from "../../../../services/conn-api/conn-api.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  // urls
  urlLocationsZip: string = "locations/zip/"
  urlLocationsCity: string = "locations/city/"

  // data
  lLocations = null
  cLocation = ""

  getValue(val:string)
  {
    console.log(val)
  }

  constructor(private connApi: ConnApiService) {

  }

  ngOnInit() {
  }


  loadLocations(cZip, cCity, nDistance) {
    // TODO: Konsolenausgabe der Searchbar-Eingabe nach Speichern dieser Eingabe in einer eigenen Variable (cLocation)
    console.log("loadLocations")
    console.log(this.cLocation)
    // set url
    let urlVariable = ""
    if (cZip === null && cCity !== null) {
      urlVariable = this.urlLocationsCity+cCity
    }
    if (cZip !== null && cCity === null) {
      urlVariable = this.urlLocationsZip+cZip
    }

    // request
    this.connApi.get(urlVariable).subscribe((response: HttpResponse<any>) => {
      this.lLocations = response.body.lLocations
      console.log(this.lLocations)
    })


  }



}
