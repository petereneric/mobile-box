import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ConnApiService} from "../../../../services/conn-api/conn-api.service";
import {HttpResponse} from "@angular/common/http";

import {GoogleMap, Marker} from '@capacitor/google-maps';
import {environment} from 'src/environments/environment.prod';
import {CapacitorGoogleMaps} from '@capacitor/google-maps/dist/typings/implementation';
import {Geolocation} from '@capacitor/geolocation';
import {animation, style} from "@angular/animations";
import {Observable} from "rxjs";
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import CircleOptions = google.maps.CircleOptions;
import Circle = google.maps.Circle;
//import {close} from "fs";


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

  //Defining the centre
  latCenter = null
  lngCenter = null

  //Defining map constructs
  distanceMatrixService: any;
  originMarker;
  infoWindow: google.maps.InfoWindow;
  circles: [];


  //locations
  geoGermany = {lat: 51.184738, lng: 10.59135}
  Bremen = {lat: 53.0758196, lng: 8.8071646};
  Munich = {lat: 48.1371079, lng: 11.5753822};
  geoCenter = this.geoGermany

  markerId: any;

  infoWindows: any = [];
  markers = [];
  bDialogLocationOpen = false

  @Input() oLocation;

  // DOM
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;

  newMap: any;

  getValue(val: string) {
    console.log(val)
  }

  constructor(private connApi: ConnApiService, private router: Router, public alertController: AlertController) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.createMap(this.geoCenter, 6);
    this.loadLocations(null, "initial", false)
  }

  ngOnDestroy() {
    this.newMap.destroy
  }


  //Reset to initial View on [clearinput]

  onClearInput() {

    this.cLocation = '';

    console.log("reset map")
    this.createMap(this.geoCenter, 6);
    this.loadLocations(null, "initial", false)

  }
  //Change Properties of Clear Button
  visibilityOn() {
    const visibilityStatus = document.getElementById('clearButton');

    visibilityStatus.style.setProperty('visibility', 'visible')
  }
  visibilityOff() {
    const visibilityStatus = document.getElementById('clearButton');
    visibilityStatus.style.setProperty('visibility', 'hidden')
  }



  loadLocations(cZip, cCity, bDialog) {

    if (cZip === null && cCity !== null) {

      // receive locations
      this.connApi.get(this.urlLocationsCity + cCity).subscribe((response: HttpResponse<any>) => {
        // echo
        console.log(response.body)

        // data
        let data = response.body;
        this.lLocations = data.lLocations
        let kmDistance = data.kmDistance
        if (data.geoCenter !== null) {
          this.geoCenter = {
            lat: data.geoCenter['geoLatitude'],
            lng: data.geoCenter['geoLongitude']
          }
        }


        // create map
        if (kmDistance <= 30) {
          this.createMap(this.geoCenter, 9.6)
        }

        if (kmDistance > 30 && kmDistance <= 50) {
          this.createMap(this.geoCenter, 8)
          if (bDialog) this.alertRadius(response.body.kmDistance)
        }

        if (kmDistance == null || kmDistance > 50) {
          console.log("show Germany")
          this.createMap(this.geoGermany, 6)
          if (bDialog) this.alertRadius(response.body.kmDistance)
        }
      })
    }

    // zip not used for search
    if (cZip !== null && cCity === null) {

    }

    //Scroll to Map after input
    if (this.cLocation != '') {
      document.getElementById("map").scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });

    }


  }

  async createMap(centerPosition, zoomFactor) {

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

    for (let location of this.lLocations) {
      console.log(location)
      var newMarker: Marker =
        {
          title: location['cName'],
          coordinate: {
            lat: Number(location['geoLatitude']),
            lng: Number(location['geoLongitude'])
          },
          // needs to fixed to specific location, currently icon moves while zooming
          //iconUrl: 'https://www.mobile-box.eu/assets/image/Mobile_Box_Location_Pin.png',
          //iconAnchor: new google.maps.Point(Number(location['geoLatitude']), Number(location['geoLongitude'])),
          //iconSize: new google.maps.Size(85, 85),
          //map: this.newMap,
          snippet: 'test 123'
        }

      console.log("Marker:" + newMarker)

      this.newMap.addMarker(newMarker);
    }

    this.newMap.setOnMarkerClickListener(data => {
      Object.keys(this.lLocations).forEach(key => {
        if (this.lLocations[key].cName === data.title) {
          console.log(this.lLocations[key])
          this.dialogLocation(this.lLocations[key])
        }
      })
    })
  }

  //Conditional alerts for results
  async alertRadius(kmDistance) {
    let cMessage = null
    let cMessageTitle = null
    if (kmDistance == null || kmDistance > 50) {
      // 50+
      cMessageTitle = 'Es wurden keine Abgabestandorte in einem Umkreis von 50 km gefunden.'
      cMessage = 'Leider befinden sich keine Abgabestandorte im Radius von 50km zum Stadtzentrum deiner Suche. Klicke auf "OK", ' +
        'dann werden dir alle verfügbaren Abgabestandorte in ganz Deutschland angezeigt oder klicke auf "VERSENDEN" und du wirst ' +
        'direkt auf die Seite "Versenden" weitergeleitet. Dort findest du eine detaillierte Anleitung dazu, wie du uns dein altes Handy zusenden kannst.'
    } else {
      // 30+ && <= 50

      cMessageTitle = 'Es wurden Abgabestandorte in einem Umkreis von' + kmDistance + 'km gefunden.'

      cMessage = 'Es befinden sich Abgabestandorte in der Nähe deines angegebenen Standortes. Klicke auf "OK", ' +
        'dann werden dir alle verfügbaren Abgabestandorte angezeigt, die im Radius von ' + kmDistance + ' km zum Stadtzentrum deiner Suche liegen. ' +
        'Oder klicke auf "VERSENDEN" dort findest du eine detaillierte Anleitung dazu, wie du uns dein altes Handy zusenden kannst.'
    }


    const alert = await this.alertController.create({
      header: cMessageTitle,
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

  highlightSelectedMarker() {

  }

  async dialogLocation(oLocation) {
    if (!this.bDialogLocationOpen) {
      this.bDialogLocationOpen = true

      console.log("dialogLocation")
      const alert = await this.alertController.create({
        header: oLocation.cName,
        subHeader: oLocation.cWebsite,
        message: oLocation.cStreet + " " + oLocation.cStreetNumber + ", " + oLocation.cZip + " " + oLocation.cCity,
        cssClass: 'my-alert',
        buttons: [
          {text: 'Schließen'}
        ]
      })

      await alert.present();

      await alert.onDidDismiss().then(res => {
        console.log("dialog closed")
        this.bDialogLocationOpen = false
      })
    }
  }

  onClickLocation($event: any) {
    console.log("onClickLocation")
    console.log($event.oLocation)
    const oLocation = $event.oLocation

    this.newMap.setCamera({
      coordinate: {
        lat: Number(oLocation.geoLatitude),
        lng: Number(oLocation.geoLongitude)
      },
      zoom: 15,
      animate: true
    })
  }
}



function addMarkerInfo() {
  throw new Error('Function not implemented.');
}

