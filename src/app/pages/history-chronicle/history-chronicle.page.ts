import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chronicle } from '../../interfaces';
import { ChronicleService } from '../../services/chronicle.service';
import { UIService } from '../../services/ui.service';

@Component({
  selector: 'app-history-chronicle',
  templateUrl: './history-chronicle.page.html',
  styleUrls: ['./history-chronicle.page.scss'],
})
export class HistoryChroniclePage implements OnInit {

  public chronicle: Chronicle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private uiService: UIService,
    private chronicleService: ChronicleService
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    const loading = await this.uiService.loading();
    await loading.present();

    this.chronicleService.getChronicle(id).subscribe(c => {

      this.chronicle = c;

      if (!c) {
        this.router.navigate(['/']);
        return;
      }

      loading.dismiss();

    });
  }

}
