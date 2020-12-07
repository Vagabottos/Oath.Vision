import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { determineTypeForCard, OathGame, Site } from '../../../interfaces';
import { ViewCardComponent } from '../../modals/view-card/view-card.component';

@Component({
  selector: 'app-world-view',
  templateUrl: './world-view.component.html',
  styleUrls: ['./world-view.component.scss'],
})
export class WorldViewComponent implements OnInit {

  @Input() public hasChildChronicles: boolean;
  @Input() public parsedChronicle: OathGame;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  determineTypeForCard(cardName: string): string {
    return determineTypeForCard(cardName);
  }

  async viewCard(cardName: string) {
    const cardType = this.determineTypeForCard(cardName);
    if (cardType !== 'relic') {
      return this.viewSpecificCard(cardName, cardType);
    }
    return this.viewSpecificSpoilerCard(cardName, cardType);
  }

  async viewSite(site: Site) {
    if (!site.ruined) {
      return this.viewSpecificCard(site.name, 'site');
    }
    return this.viewSpecificSpoilerCard(site.name, 'site');
  }

  async viewSpecificSpoilerCard(cardName: string, type: string) {

    if (this.hasChildChronicles) {
      return this.viewSpecificCard(cardName, type);
    }

    const alert = await this.alertCtrl.create({
      header: 'Spoiler Warning!',
      message: 'This card contains spoilers for this chronicle. Are you sure you want to see it?',
      buttons: ['Cancel', {
        text: 'Continue',
        handler: () => this.viewSpecificCard(cardName, type)
      }]
    });

    await alert.present();

  }

  async viewSpecificCard(cardName: string, type: string) {
    const modal = await this.modalCtrl.create({
      component: ViewCardComponent,
      cssClass: 'big-alert',
      componentProps: {
        cardName,
        cardType: type
      }
    });

    return modal.present();
  }

}
