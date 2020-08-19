import { Component, OnInit, Input } from '@angular/core';
import { Chronicle, OathGame } from '../../../interfaces';
import { ChronicleService } from '../../../services/chronicle.service';

@Component({
  selector: 'app-chronicle-card',
  templateUrl: './chronicle-card.component.html',
  styleUrls: ['./chronicle-card.component.scss'],
})
export class ChronicleCardComponent implements OnInit {

  @Input() chronicle: Chronicle;
  @Input() canNavigate: boolean;

  public chronicleData: OathGame;

  constructor(private chronicleService: ChronicleService) { }

  ngOnInit() {
    this.chronicleData = this.chronicleService.parseChronicle(this.chronicle.seed);
  }

  allPlayerNames() {
    const names = Object.values(this.chronicle.playerNames).filter(Boolean);
    if (names.length === 0) { return 'No players logged.'; }

    return 'Played by: ' + names.join(', ');
  }

}
