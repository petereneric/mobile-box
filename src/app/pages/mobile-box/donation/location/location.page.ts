import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ConnApiService} from "../../../../services/conn-api/conn-api.service";
import {HttpResponse} from "@angular/common/http";

import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment.prod';
import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';
import { Geolocation } from '@capacitor/geolocation';
import {animation} from "@angular/animations";
import {Observable} from "rxjs";


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
  geoCenter = null


  latCenter = null
  lngCenter = null

 distanceMatrixService: any ;
  originMarker;
  infowindow;
  circles: [];
  markers: [];

  mapState: 0 | 1 = 0;
  markerState: 0 | 1 = 0;


// The company location
 mapCentre = { lat: 50.9519055, lng: 6.9017056 };

  //Location
  Bremen = { lat: 53.0758196, lng: 8.8071646 };
  Munich = { lat: 48.1371079, lng: 11.5753822 };




  // DOM
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center:  any = this.mapCentre;




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
    this.createMap(this.mapCentre);
  }


  async createMap(centerPosition) {
    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: apiKey,
      config: {
        center: centerPosition,
        zoom: 10,
      },
    });

    centerPosition = this.mapCentre

    this.addMarker(this.mapCentre.lat, this.mapCentre.lng);


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

  async moveCenter(latCenter, lngCenter) {
    if (!this.center){
      return;
    }
    await this.newMap.removeMarker(this.center);

    if(this.markerState = 0){
      this.markerState = 1;
      this.center = await this.newMap.addMarker({
        coordinate: {
          lat: latCenter,
          lng: lngCenter
        }
      });
    } else {
      this.markerState = 0;
      this.center = await this.newMap.addMarker({
          coordinate: {
            lat: this.mapCentre['lat'],
            lng: this.mapCentre['lng']
          }
        }
      )
    }

  }


  loadLocations(cZip, cCity, nDistance) {


    // TODO: Konsolenausgabe der Searchbar-Eingabe nach Speichern dieser Eingabe in einer eigenen Variable (cLocation)
    console.log("loadLocations")
    console.log(this.cLocation)

    //this.moveCenter(this.latCenter, this.lngCenter)

    //this.center =  this.Bremen
    //this.createMap();


    // set url
    let urlVariable = ""
    if (cZip === null && cCity !== null) {
      urlVariable = this.urlLocationsCity + cCity

      this.connApi.get(urlVariable).subscribe((response: HttpResponse<any>) => {
        this.geoCenter = response.body.geoCenter
        this.latCenter = this.geoCenter['geoLatitude']
        this.lngCenter = this.geoCenter['geoLongitude']
        console.log(this.latCenter)
        console.log(this.lngCenter)

        var newCenter = {
          lat: this.latCenter,
          lng: this.lngCenter
        }
        this.mapCentre = newCenter

        this.createMap(newCenter)
      })
    }



      if (cZip !== null && cCity === null) {
      urlVariable = this.urlLocationsZip+cZip

        this.connApi.get(urlVariable).subscribe((response: HttpResponse<any>) => {
          this.geoCenter = response.body.geoCenter
          this.latCenter = this.geoCenter['geoLatitude']
          this.lngCenter = this.geoCenter['geoLongitude']
          console.log(this.latCenter)
          console.log(this.lngCenter)

           var newCenter = {
            lat: this.latCenter,
             lng: this.lngCenter
           }

          this.mapCentre = newCenter

           this.createMap(newCenter)



        })

    }

    //this.moveCenter(this.latCenter, this.lngCenter)



    // request
    this.connApi.get(urlVariable).subscribe((response: HttpResponse<any>) => {
      this.lLocations = response.body.lLocations
      console.log(this.lLocations)

      //TODO: Change center position
      //Set Center to input


        /**[{lat: this.connApi.get(urlVariable['geoLatitude']),
        lng: this.connApi.get(urlVariable['geoLongitude'])
      }]
      console.log(this.center) **/


      //Load locations into map

      for (let location of this.lLocations) {
        console.log(location)
        var newMarker =
          {
            title: location['cName'],
            coordinate: {
              lat: Number(location['geoLatitude']),
              lng: Number(location['geoLongitude'])
            }

          }

          //this.moveCenter(this.latCenter, this.lngCenter)
          //console.log(this.center)
        console.log("Marker:" + newMarker)
        this.newMap.addMarker(newMarker);
      }
    })

        console.log('marker added')

    //TODO: Delete created markers on additional searches






  }


  /**
   *ADD RADIUS OVERLAY MAP
  set_radius = new google.maps.Circle({
    strokeColor: "#f38038",
    strokeOpacity: 0.4,
    strokeWeight: 2,
    fillColor: "#f38038",
    fillOpacity: 0.25,
    map: this.newMap,
    center: new google.maps.LatLng(this.center.lat, this.center.lng),
    radius: 20 * 1000, // 20km
  });
   **/


}
