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
    window.open('https://www.dhl.de/retoure/gw/rpcustomerweb/OrderEntry.action?hash=331307107d4e919367228944354809599f0873d6c803095f0e02a9a49902693f', '_blank');
  }
}
