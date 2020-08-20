import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Chronicle, OathGame } from '../../../interfaces';
import { ChronicleService } from '../../../services/chronicle.service';

@Component({
  selector: 'app-childrenchronicles',
  templateUrl: './childrenchronicles.component.html',
  styleUrls: ['./childrenchronicles.component.scss'],
})
export class ChildrenChroniclesComponent implements OnInit {

  @Input() children: Chronicle[] = [];

  public childrenParsed: OathGame[] = [];

  constructor(private modalCtrl: ModalController, private chronicleService: ChronicleService) { }

  ngOnInit() {
    this.childrenParsed = this.children.map(c => this.chronicleService.parseChronicle(c.seed));
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  choose(chronicle: Chronicle) {
    this.modalCtrl.dismiss(chronicle);
  }

  allPlayerNames(chronicle: Chronicle) {
    const names = Object.values(chronicle.playerNames).filter(Boolean);
    if (names.length === 0) { return 'No players logged.'; }

    return 'Played by: ' + names.join(', ');
  }

}
