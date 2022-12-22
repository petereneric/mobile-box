import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ConnApiService} from "../../../../services/conn-api/conn-api.service";
import {HttpResponse} from "@angular/common/http";

import {GoogleMap, Marker} from '@capacitor/google-maps';
import {environment} from 'src/environments/environment.prod';
import {CapacitorGoogleMaps} from '@capacitor/google-maps/dist/typings/implementation';
import {Geolocation} from '@capacitor/geolocation';
import {animation} from "@angular/animations";
import {Observable} from "rxjs";
import CircleOptions = google.maps.CircleOptions;
import Circle = google.maps.Circle;


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

  distanceMatrixService: any;
  originMarker;
  infowindow;
  circles: [];
  markers: [];

  radius

  //mapState: 0 | 1 = 0;
  //markerState: 0 | 1 = 0;


// The company location
  mapCentre = {lat: 50.9519055, lng: 6.9017056};

  //Location
  geoGermany = {lat: 51.184738, lng: 10.59135}
  Bremen = {lat: 53.0758196, lng: 8.8071646};
  Munich = {lat: 48.1371079, lng: 11.5753822};


  // DOM
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any = this.mapCentre;
  setRadius: Circle;


  markerId: string;
  kmDistance: any;

  getValue(val: string) {
    console.log(val)
  }

  constructor(private connApi: ConnApiService) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createMap(this.mapCentre, 15);
  }


  async createMap(centerPosition, zoomFactor, boundary?) {
    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: apiKey,
      config: {
        center: centerPosition,
        zoom: zoomFactor,
        clickableIcons: true,

      },
    });


    centerPosition = this.mapCentre



    /**


    this.setRadius = new google.maps.Circle({
      strokeColor: "#f38038",
      strokeOpacity: 0.4,
      strokeWeight: 2,
      fillColor: "#f38038",
      fillOpacity: 0.25,
      //map: this.newMap,
      center: new google.maps.LatLng({lat: 50, lng: 6}),
      radius: 50 * 1000, // 20km
    }); **/


    zoomFactor = 10

    for (let location of this.lLocations) {
      console.log(location)
      var newMarker =
        {
          title: location['cName'],
          coordinate: {
            lat: Number(location['geoLatitude']),
            lng: Number(location['geoLongitude'])
          },

        }


      console.log("Marker:" + newMarker)
      this.newMap.addMarker(newMarker);
    }

    this.addMarker(this.mapCentre.lat, this.mapCentre.lng);

    function addMarkerInfo() {
      //define content for info window

      const contentString =  "<b>This is a Test</b>";

      var infoWindow = new google.maps.InfoWindow({
        content: "Test contetn property",
        ariaLabel: "Test",
      });

      google.maps.event.addListener(this.markerId, 'click', function () {
        infoWindow.open
      });
    };


  }




  async addMarker(lat, lng) {

    // Add a marker to the map
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      },
      draggable: false,
      // iconUrl: 'https://www.mobile-box.eu/assets/image/Mobile_Box_Location_Pin.png',
      //iconSize: new google.maps.Size(100, 100),


    });
  }


  //Results of Input
  loadLocations(cZip, cCity, nDistance, kmDistance) {


    // Konsolenausgabe der Searchbar-Eingabe nach Speichern dieser Eingabe in einer eigenen Variable (cLocation)
    console.log("loadLocations")
    console.log(this.cLocation)






    // set url
    let urlVariable = ""
    if (cZip === null && cCity !== null) {
      urlVariable = this.urlLocationsCity + cCity

      this.connApi.get(urlVariable).subscribe((response: HttpResponse<any>) => {
        this.geoCenter = response.body.geoCenter
        this.kmDistance = response.body.kmDistance
        console.log(this.kmDistance)
        console.log(response.body)
        this.latCenter = this.geoCenter['geoLatitude']
        this.lngCenter = this.geoCenter['geoLongitude']
        console.log(this.latCenter)
        console.log(this.lngCenter)
        console.log(this.kmDistance)

        var newCenter = {
          lat: this.latCenter,
          lng: this.lngCenter
        }
        this.mapCentre = newCenter


        this.lLocations = response.body.lLocations

        console.log(response.body)



        if (this.kmDistance <= 30) {
          this.createMap(newCenter, 9.6)
        }
        if (this.kmDistance > 30 && this.kmDistance <= 50) {
          this.createMap(newCenter, 8)
        }
        if (this.kmDistance == null || this.kmDistance > 50){
          this.createMap(this.geoGermany, 6)
        }

      })
    }


    if (cZip !== null && cCity === null) {
      urlVariable = this.urlLocationsZip + cZip

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


        if (this.kmDistance <= 30) {
          this.createMap(newCenter, 9.6)
        }
        if (this.kmDistance > 30 && this.kmDistance <= 50) {
          this.createMap(newCenter, 8)
        }
        if (this.kmDistance == null || this.kmDistance > 50){
          this.createMap(this.geoGermany, 6)
        }




      })
    }
    console.log('marker added')
  }


  /**


   ADD RADIUS OVERLAY MAP
   set_radius = new google.maps.Circle({
    strokeColor: "#f38038",
    strokeOpacity: 0.4,
    strokeWeight: 2,
    fillColor: "#f38038",
    fillOpacity: 0.25,
    map: this.newMap,
    center: new google.maps.LatLng(this.center.lat, this.center.lng),
    radius: 50 * 1000, // 20km
  });
   **/


}
