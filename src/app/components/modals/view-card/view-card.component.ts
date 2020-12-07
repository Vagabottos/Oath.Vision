import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FAQService } from '../../../faq.service';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss'],
})
export class ViewCardComponent implements OnInit {

  @Input() cardName: string;
  @Input() cardType: string;

  public secondaryCardName: string;

  public faqs = [];

  constructor(
    private modalCtrl: ModalController,
    private faqService: FAQService
  ) { }

  ngOnInit() {
    this.faqs = this.faqService.getFAQ(this.cardName) || [];

    this.cleanFAQS();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  private cleanFAQS() {

    this.faqs.forEach(qa => {

      const cards = [];
      const rules = [];

      const cleanString = (str: string) => {

        while (str.includes('$card:')) {
          const idx = str.indexOf('$card:') + 6;
          const endIdx = str.indexOf('$', idx);

          const cardName = str.substring(idx, endIdx);
          cards.push(cardName);
          str = str.slice(0, idx - 6) + cardName + str.slice(endIdx + 1);
        }

        while (str.includes('$rule:')) {
          const idx = str.indexOf('$rule:') + 6;
          const endIdx = str.indexOf('$', idx);

          const ruleIdx = str.substring(idx, endIdx);
          rules.push(ruleIdx);
          str = str.slice(0, idx - 6) + ruleIdx + str.slice(endIdx + 1);
        }

        return str;
      };

      qa.q = cleanString(qa.q);
      qa.a = cleanString(qa.a);
      qa.cards = cards;
      qa.rules = rules;
    });
  }

}
