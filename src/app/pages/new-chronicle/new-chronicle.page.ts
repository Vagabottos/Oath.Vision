import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chronicle, OathGame } from '../../interfaces';
import { ChronicleService } from '../../services/chronicle.service';

@Component({
  selector: 'app-new-chronicle',
  templateUrl: './new-chronicle.page.html',
  styleUrls: ['./new-chronicle.page.scss'],
})
export class NewChroniclePage implements OnInit {

  public chronicle: Chronicle;
  public chronicleParsedData: OathGame;

  public loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chronicleService: ChronicleService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    // if a parent id is specified we do some extra
    if (id) {
      this.loading = true;
      this.chronicleService.getChronicle(id).subscribe(c => {

        this.chronicle = c;

        try {
          this.chronicleParsedData = this.chronicleService.parseChronicle(c.seed);
        } catch {}

        if (!c || !this.chronicleParsedData) {
          this.router.navigate(['/']);
          return;
        }

        this.loading = false;
      });
    }
  }

}
