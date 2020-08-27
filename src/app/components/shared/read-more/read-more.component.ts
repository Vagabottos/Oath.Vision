import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss'],
})
export class ReadMoreComponent implements OnInit {

  @Input() text: string;
  @Input() title = 'More About This Chronicle';
  @Input() length = 255;

  public get visibleText() {
    if (this.text.length < this.length) { return this.text; }

    return this.text.substring(0, this.length) + '...';
  }

  public showReadMore: boolean;

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
    if (this.text.length > this.length) { this.showReadMore = true; }
  }

  async readMore() {
    const alert = await this.alertCtrl.create({
      header: this.title,
      message: this.text.split('\n').join('<br>'),
      cssClass: 'readmore-alert',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel'
        }
      ]
    });

    alert.present();
  }

}
