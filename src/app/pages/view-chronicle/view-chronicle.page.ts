import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonButton, ModalController, AlertController } from '@ionic/angular';

import * as Clipboard from 'clipboard';

import { ChronicleService } from '../../services/chronicle.service';
import { CardSuits, Chronicle, determineTypeForCard, OathGame, Suit, Site } from '../../interfaces';
import { UIService } from '../../services/ui.service';
import { ViewCardComponent } from '../../components/modals/view-card/view-card.component';
import { ChildrenChroniclesComponent } from '../../components/modals/childrenchronicles/childrenchronicles.component';

@Component({
  selector: 'app-view-chronicle',
  templateUrl: './view-chronicle.page.html',
  styleUrls: ['./view-chronicle.page.scss'],
})
export class ViewChroniclePage implements OnInit {

  @ViewChild('seedBtn', { static: false }) seedBtn: IonButton;

  public chronicle: Chronicle;
  public chronicleParsedData: OathGame;

  public childChronicles: Chronicle[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private uiService: UIService,
    public chronicleService: ChronicleService
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    const loading = await this.uiService.loading();
    await loading.present();

    this.chronicleService.getChronicle(id).subscribe(c => {

      this.chronicle = c;

      try {
        this.chronicleParsedData = this.chronicleService.parseChronicle(c.seed);
      } catch {}

      if (!c || !this.chronicleParsedData) {
        this.router.navigate(['/']);
        return;
      }

      this.chronicleService.getChildChronicles(id).subscribe(children => {
        this.childChronicles = children;
      });

      setTimeout(() => {
        const clipboard = new Clipboard((this.seedBtn as any).el);
        clipboard.on('success', () => {
          this.uiService.toast('Copied seed to clipboard!');
        });
      });

      loading.dismiss();

    });
  }

  playerCitizenshipString(color: string): string {
    if (!this.chronicleParsedData) { return 'Player'; }
    return this.chronicleParsedData.playerCitizenship[color];
  }

  async loadChildren() {
    const modal = await this.modalCtrl.create({
      component: ChildrenChroniclesComponent,
      componentProps: {
        children: this.childChronicles
      }
    });

    modal.onDidDismiss().then(res => {
      if (!res || !res.data) { return; }
      this.router.navigate(['/view-chronicle', res.data.id]);
    });

    await modal.present();
  }

  public getCountInDeckForSuit(suit: Suit) {
    const cards = this.chronicleParsedData.world.filter(c => CardSuits[c.name] === suit);
    return cards.length;
  }

}
