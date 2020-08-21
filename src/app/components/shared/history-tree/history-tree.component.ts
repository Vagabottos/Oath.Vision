import { Component, Input, OnInit } from '@angular/core';
import { Chronicle, OathGame } from '../../../interfaces';
import { ChronicleService } from '../../../services/chronicle.service';

@Component({
  selector: 'app-history-tree',
  templateUrl: './history-tree.component.html',
  styleUrls: ['./history-tree.component.scss'],
})
export class HistoryTreeComponent implements OnInit {

  public activeHistory = 'Chancellor';

  @Input() childChronicle: Chronicle;

  public historySuppressed: boolean;
  public chronicles: Array<{ game: OathGame, chronicle: Chronicle}> = [];

  constructor(public chronicleService: ChronicleService) { }

  ngOnInit() {
    this.addPreviousChronicle(this.childChronicle);
  }

  addPreviousChronicle(chronicle: Chronicle) {
    this.chronicles.unshift({ chronicle, game: this.chronicleService.parseChronicle(chronicle.seed) });

    if (this.chronicles.length > 50) {
      this.historySuppressed = true;
      return;
    }

    if (chronicle.parentId) {
      this.chronicleService.getChronicle(chronicle.parentId)
        .subscribe(chron => {
          this.addPreviousChronicle(chron);
        });
    }
  }

  changeHistory(playerName: string) {
    this.activeHistory = playerName;
  }

}
