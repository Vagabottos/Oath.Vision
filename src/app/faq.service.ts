import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FAQService {

  private faqHash = {};

  public async init() {
    try {
      const faq = await fetch('https://dl.dropboxusercontent.com/s/qq3ckwivu0jixt4/oath.json?dl=0');
      const entries = await faq.json();

      entries.forEach(entry => {
        this.faqHash[entry.card] = entry.faq;
      });
    } catch (e) {
      console.error('Could not initialize FAQ; malformed JSON?');
    }
  }

  public getFAQ(card: string) {
    return this.faqHash[card];
  }
}
