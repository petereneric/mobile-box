import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ConnApiService} from "../../../../services/conn-api/conn-api.service";
import {HttpResponse} from "@angular/common/http";

import {GoogleMap, Marker} from '@capacitor/google-maps';
import {environment} from 'src/environments/environment.prod';
import {CapacitorGoogleMaps} from '@capacitor/google-maps/dist/typings/implementation';
import {Geolocation} from '@capacitor/geolocation';
import {animation} from "@angular/animations";
import {Observable} from "rxjs";
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';


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

  //mapState: 0 | 1 = 0;
  //markerState: 0 | 1 = 0;


// The company location
  mapCentre = {lat: 50.9519055, lng: 6.9017056};

  //Location
  Bremen = {lat: 53.0758196, lng: 8.8071646};
  Munich = {lat: 48.1371079, lng: 11.5753822};


  // DOM
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any = this.mapCentre;


  markerId: string;

  getValue(val: string) {
    console.log(val)
  }

  constructor(private connApi: ConnApiService, private router: Router, public alertController: AlertController) {

  }

  ngOnInit() {
    this.loadLocations(null, "completeMap", null)
  }

  ngAfterViewInit() {
    this.createMap(this.mapCentre, 15);
  }


  async createMap(centerPosition, zoomFactor) {
    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: apiKey,
      config: {
        center: centerPosition,
        zoom: zoomFactor,
      },
    });

    centerPosition = this.mapCentre

    zoomFactor = 10

    this.addMarker(this.mapCentre.lat, this.mapCentre.lng);


    console.log(this.lLocations)


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


      console.log("Marker:" + newMarker)
      this.newMap.addMarker(newMarker);
    }


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

  /*

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

  } */


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
        console.log(response.body)
        this.lLocations = response.body.lLocations
        let kmDistance = response.body.kmDistance;
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

        this.createMap(newCenter, 10)



        if (kmDistance == null || kmDistance > 30) {
          this.alertRadius(response.body.kmDistance)
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

        this.createMap(newCenter, 10)


      })

    }


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


  async alertRadius(kmDistance) {
    let cMessage = null;
    if (kmDistance == null) {
      // 50+
      cMessage = 'Leider befinden sich keine Abgabestandorte im Radius kleiner als 50km zu dem Stadtzentrum deiner Suche. Klicke auf "OK", ' +
        'dann werden dir alle verfügbaren Abgabestandorte in ganz Deutschland angezeigt oder klicke auf "VERSENDEN" und du wirst ' +
        'direkt auf die Seite "Versenden" weitergeleitet. Dort findest du eine detailierte Anleitung wie du dein Handy zu uns verschicken kannst.'
    } else {
      // 30+ && <= 50
      cMessage = 'Es befinden sich Abgabestandorte passend zu deiner Suche. Klicke auf "OK", ' +
        'dann werden dir alle verfügbaren Abgabestandorte angezeigt, die den Radius von 30km zu dem Stadtzentrum deiner Suche besitzen. ' +
        'Oder klicke auf "VERSENDEN" dort findest du eine detailierte Anleitung wie du dein Handy zu uns verschicken kannst.'
    }
    const alert = await this.alertController.create({
      header: 'Der nächste Abgabestandort ist bis zu ' + kmDistance + 'km entfernt',
      subHeader: '',
      message: cMessage,
      cssClass: 'my-alert',
      buttons: [
        {text: 'Ok'},
        {
          text: 'Versenden', handler: () => {
            this.router.navigate(['/handys-spenden/versenden'])
          }
        }]
    });
    await alert.present();
  }

}
