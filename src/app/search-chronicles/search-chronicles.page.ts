import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-chronicles',
  templateUrl: './search-chronicles.page.html',
  styleUrls: ['./search-chronicles.page.scss'],
})
export class SearchChroniclesPage implements OnInit {

  searchForm = new FormGroup({
    search: new FormControl('', Validators.compose([Validators.required])),
  });

  constructor() { }

  ngOnInit() {
  }

}
