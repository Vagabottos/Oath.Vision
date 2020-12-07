import { Component, OnInit } from '@angular/core';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Chronicle } from '../../../interfaces';
import { ChronicleService } from '../../../services/chronicle.service';

@Component({
  selector: 'app-chronicle-list',
  templateUrl: './chronicle-list.component.html',
  styleUrls: ['./chronicle-list.component.scss'],
})
export class ChronicleListComponent implements OnInit {

  public lastChronicle: QueryDocumentSnapshot<Chronicle>;
  public chronicles: Chronicle[] = [];
  public lastPage: boolean;

  constructor(public chronicleService: ChronicleService) {}

  ngOnInit() {
    this.getMoreData();
  }

  getMoreData($event?) {
    console.log('called');
    this.chronicleService.getChronicleList(this.lastChronicle)
      .subscribe(c => {
        this.chronicles.push(...c.map(d => d.data()));
        this.lastChronicle = c[c.length - 1];

        if ($event) { $event.target.complete(); }
      });
  }

}
