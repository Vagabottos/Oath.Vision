import { Component, Input, OnInit } from '@angular/core';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Chronicle } from '../../../interfaces';
import { ChronicleService } from '../../../services/chronicle.service';

@Component({
  selector: 'app-chronicle-list',
  templateUrl: './chronicle-list.component.html',
  styleUrls: ['./chronicle-list.component.scss'],
})
export class ChronicleListComponent implements OnInit {

  private searchQuery: string;
  @Input() set search(search: string) {
    this.searchQuery = search;
    if (!this.searchQuery) {
      this.lastChronicle = null;
      this.chronicles = [];
    }

    this.getMoreData();
  }

  public lastChronicle: QueryDocumentSnapshot<Chronicle>;
  public chronicles: Chronicle[] = [];
  public lastPage: boolean;

  constructor(public chronicleService: ChronicleService) {}

  ngOnInit() {
    this.getMoreData();
  }

  getMoreData($event?) {
    this.chronicleService.getChronicleList(this.lastChronicle, this.searchQuery)
      .subscribe(c => {
        if (this.searchQuery && !this.lastChronicle) {
          this.chronicles = c.map(d => d.data());
        } else {
          this.chronicles.push(...c.map(d => d.data()));
        }

        this.lastChronicle = c[c.length - 1];

        if ($event) { $event.target.complete(); }
      });
  }

}
