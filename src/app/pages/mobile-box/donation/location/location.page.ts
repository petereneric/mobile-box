import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConnApiService} from "../../../../services/conn-api/conn-api.service";
import {HttpResponse} from "@angular/common/http";

import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment.prod';
import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';
import { Geolocation } from '@capacitor/geolocation';
import {animation} from "@angular/animations";

const apiKey = 'AIzaSyBi8-bcvFsKzomxh6TXLc6CfLaATi1PjEk';


@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})


export class LocationPage implements OnInit, AfterViewInit {

  // urls
  urlLocationsZip: string = "locations/zip/"
  urlLocationsCity: string = "locations/city/"

  // data
  lLocations = null
  cLocation = ""


  // DOM
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any = {
    lat: 50.9519055,
    lng: 6.9017056,
  };
  markerId: string;

  getValue(val:string)
  {
    console.log(val)
  }

  constructor(private connApi: ConnApiService) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createMap();
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: apiKey,
      config: {
        center: this.center,
        zoom: 17,
      },
    });

    this.addMarker(this.center.lat, this.center.lng);


  }

  async addMarker(lat, lng) {
    // Add a marker to the map
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      },
      draggable: true,
    });
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
