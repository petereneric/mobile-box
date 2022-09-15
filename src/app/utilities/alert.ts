import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable()

export class Alert {

  constructor(public AlertController: AlertController) {
  }

  async contact(): Promise<any> {
    return new Promise(async (resolve) => {
        const alert = await this.AlertController.create({
          cssClass: 'my-alert',
          header: 'Kontakt',
          subHeader: 'E-Mail & Telefon',
          message: 'Gerne kannst Du uns eine E-Mail an sammlung@mobile-box.eu mit deinen Fragen oder Anregungen senden. Darüber hinaus hast Du die Möglichkeit uns telefonisch ' +
            'unter der +49 (0) 221 168930 45 zu kontaktieren. Dein Ansprechpartner ist Steven, der Dir gerne weiterhelfen wird.',
          buttons: [{text: 'Ok'}]
        });
        await alert.present();
      }
    );
  }
}
