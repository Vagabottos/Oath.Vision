import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ChronicleService } from '../../chronicle.service';
import { Chronicle } from '../../interfaces';

@Component({
  selector: 'app-view-chronicle',
  templateUrl: './view-chronicle.page.html',
  styleUrls: ['./view-chronicle.page.scss'],
})
export class ViewChroniclePage implements OnInit {

  public chronicle: Chronicle;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chronicleService: ChronicleService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.chronicleService.getChronicle(id).subscribe(c => {
      if (!c) {
        this.router.navigate(['/']);
        return;
      }

      this.chronicle = c;
    });
  }

}
