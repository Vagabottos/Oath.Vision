import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { cleanText, defaultSeed, validChronicleSeed } from '../components/shared/chronicle-edit/validators';
import { Card, CardSuits, OathGame, Suit } from '../interfaces';
import { ChronicleService } from '../services/chronicle.service';

@Component({
  selector: 'app-preview-chronicle',
  templateUrl: './preview-chronicle.page.html',
  styleUrls: ['./preview-chronicle.page.scss'],
})
export class PreviewChroniclePage implements OnInit {

  public parsedChronicle: OathGame;
  public viewSpoilers = false;

  chronicleForm = new FormGroup({
    seed: new FormControl('', Validators.compose([Validators.required, cleanText, validChronicleSeed])),
  });

  constructor(
    private route: ActivatedRoute,
    public chronicleService: ChronicleService
  ) { }

  ngOnInit() {
    const seed = this.route.snapshot.queryParamMap.get('seed');
    this.chronicleForm.get('seed').setValue(seed || defaultSeed);
    this.parseSeed();
  }

  parseSeed() {
    const seed = this.chronicleForm.get('seed').value;

    try {
      this.parsedChronicle = this.chronicleService.parseChronicle(seed);
    } catch {}
  }

  playerCitizenshipString(color: string): string {
    if (!this.parsedChronicle) { return 'Player'; }
    return this.parsedChronicle.playerCitizenship[color];
  }

  public getCountInDeckForSuit(suit: Suit) {
    const cards = this.parsedChronicle.world.filter(c => CardSuits[c.name] === suit);
    return cards.length;
  }

  public dispossessedString(dispossessed: Card[]): string {
    return dispossessed.map(x => x.name).join(', ');
  }

}
