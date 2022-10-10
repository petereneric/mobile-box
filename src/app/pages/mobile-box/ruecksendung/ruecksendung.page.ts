import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruecksendung',
  templateUrl: './ruecksendung.page.html',
  styleUrls: ['./ruecksendung.page.scss'],
})
export class RuecksendungPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSend() {
    window.open('https://www.dhl.de/dhl-rpi/gw/rpcustomerweb/OrderAnon.action?__userlocale=DE&__gwfs=6278655104554630712', '_blank');
  }
}
