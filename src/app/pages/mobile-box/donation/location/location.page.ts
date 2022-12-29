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
import CircleOptions = google.maps.CircleOptions;
import Circle = google.maps.Circle;
import {LocationComponent} from "../../../../components/location/location.component";


const apiKey = 'AIzaSyBi8-bcvFsKzomxh6TXLc6CfLaATi1PjEk';



@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
  imports: [LocationComponent],
})


export class LocationPage implements OnInit, AfterViewInit {

  // urls
  urlLocationsZip: string = "locations/zip/"
  urlLocationsCity: string = "locations/city/"

  // data
  lLocations = null
  cLocation = ""

  //Defining the centre
  geoCenter = null
  latCenter = null
  lngCenter = null

  //Defining map constructs
  distanceMatrixService: any;
  originMarker;
  infoWindow: google.maps.InfoWindow;
  circles: [];



  //Company location
  mapCentre = {lat: 50.9519055, lng: 6.9017056};

  //Other Locations
  geoGermany = {lat: 51.184738, lng: 10.59135}
  Bremen = {lat: 53.0758196, lng: 8.8071646};
  Munich = {lat: 48.1371079, lng: 11.5753822};


  markerId: any;
  kmDistance: any;

  infoWindows: any = [];
  markers = [];

  @Input() oLocation;

  // DOM
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;

  newMap: any;
  center: any = this.mapCentre;

  getValue(val: string) {
    console.log(val)
  }

  constructor(private connApi: ConnApiService, private router: Router, public alertController: AlertController) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.createMap(this.mapCentre, 15);
  }


  //Main

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

    //Initial settings
    centerPosition = this.mapCentre
    zoomFactor = 10

    //Options for Rendering Location markers



        for (let location of this.lLocations) {
      console.log(location)
      var newMarker =
        {
          title: location['cName'],
          coordinate: {
            lat: Number(location['geoLatitude']),
            lng: Number(location['geoLongitude'])
          },
          iconUrl: 'https://www.mobile-box.eu/assets/image/Mobile_Box_Location_Pin.png',
          iconAnchor: new google.maps.Point(Number(location['geoLatitude']), Number(location['geoLongitude'])),
          iconSize: new google.maps.Size(85, 85),
          map: this.newMap,
          snippet: 'test 123'
        }

      console.log("Marker:" + newMarker)

      this.newMap.addMarker(newMarker);
    }

  }

 //TODO: Write function emphasize clicked list item
  highlightSelectedMarker() {
    //Check if clicked list item has map marker
   // if (this.oLocation['cName']){
      //console.log('mouseover test')}
  }

  //TODO: Write Function for popup on click event
  addMarkerInfo() {
    //define content for info window
     /*
    for (let location of this.lLocations){
      let infoContent = '<b>' + location['cName'] + '</b> </br>'+
        '<p>' + location['cStreet'] + '' + location['cStreetnumber'] +
        '</b> </br>'+ location['cZip'] + '' + location['cCity'] + '</p>'

      let infoWindow = new google.maps.InfoWindow({
        content: infoContent,
        //position: marker['coordinate'],
      });

      infoWindow.open(this.newMap)

      */




  };




  loadLocations(cZip, cCity, nDistance, kmDistance) {


    //Konsolenausgabe der Searchbar-Eingabe nach Speichern dieser Eingabe in einer eigenen Variable (cLocation)
    console.log("loadLocations")
    console.log(this.cLocation)



    // set url
    let urlVariable = ""
    if (cZip === null && cCity !== null) {
      urlVariable = this.urlLocationsCity + cCity

      this.connApi.get(urlVariable).subscribe((response: HttpResponse<any>) => {
        console.log(response.body)
        this.lLocations = response.body.lLocations
        let kmDistance = response.body.kmDistance;
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
          this.alertRadius(response.body.kmDistance)
        }
        if (this.kmDistance == null || this.kmDistance > 50) {
          this.createMap(this.geoGermany, 6)
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

        if (this.kmDistance <= 30) {
          this.createMap(newCenter, 9.6)
        }
        if (this.kmDistance > 30 && this.kmDistance <= 50) {
          this.createMap(newCenter, 8)
        }
        if (this.kmDistance == null || this.kmDistance > 50) {
          this.createMap(this.geoGermany, 6)
        }

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

  //Conditional alerts for results
  async alertRadius(kmDistance) {
    let cMessage = null
    let cMessageTitle = null
    if (kmDistance == null || kmDistance > 50) {
      // 50+
      cMessageTitle = 'Es wurden keine Abgabestandorte in einem Umkreis von 50 km gefunden.'
      cMessage = 'Leider befinden sich keine Abgabestandorte im Radius von 50km zum Stadtzentrum deiner Suche. Klicke auf "OK", ' +
        'dann werden dir alle verfügbaren Abgabestandorte in ganz Deutschland angezeigt oder klicke auf "VERSENDEN" und du wirst ' +
        'direkt auf die Seite "Versenden" weitergeleitet. Dort findest du eine detailierte Anleitung dazu, wie du uns dein Handy zusenden kannst.'
    } else {
      // 30+ && <= 50

      cMessageTitle = 'Es wurden Abgabestandorte in einem Umkreis von' + kmDistance +'km gefunden.'

      cMessage = 'Es befinden sich Abgabestandorte in der Nähe deines angegebenen Standortes. Klicke auf "OK", ' +
        'dann werden dir alle verfügbaren Abgabestandorte angezeigt, die im Radius von ' + kmDistance + ' km zum Stadtzentrum deiner Suche liegen. ' +
        'Oder klicke auf "VERSENDEN" dort findest du eine detailierte Anleitung dazu, wie du uns dein Handy zusenden kannst.'
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


}
function addMarkerInfo() {
    throw new Error('Function not implemented.');
}

