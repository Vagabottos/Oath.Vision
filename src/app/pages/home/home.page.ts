import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ChronicleService } from '../../services/chronicle.service';
import { Chronicle } from '../../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  chronicles$: Observable<Chronicle[]>;

  constructor(public chronicleService: ChronicleService) {}

  ngOnInit() {
    this.chronicles$ = this.chronicleService.getRecentChronicles();
  }
}
