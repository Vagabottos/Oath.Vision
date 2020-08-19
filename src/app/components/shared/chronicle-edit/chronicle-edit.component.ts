import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { parseOathTTSSavefileString } from '@seiyria/oath-parser';
import { CensorSensor } from 'censor-sensor';
import { ChronicleService } from '../../../chronicle.service';

import { Chronicle, CreateChronicle, OathGame, PlayerColor } from '../../../interfaces';

const censor = new CensorSensor();

export function validChronicleSeed(control: AbstractControl): { [key: string]: any } | null {
  try {
    const parsed = parseOathTTSSavefileString(control.value);
    if (parsed.version.major < 3 && parsed.version.minor < 1) { return { validVersion: true }; }
    if (parsed.version.major > 3) { return { validVersion: true }; }
  } catch {
    return { validSeed: true };
  }

  return null;
}

export function cleanText(control: AbstractControl): { [key: string]: any } | null {
  return censor.isProfaneIsh(control.value) ? { rude: true } : null;
}

const nameValidators = [Validators.maxLength(25), cleanText];
const actionValidators = [Validators.maxLength(255), cleanText];

@Component({
  selector: 'app-chronicle-edit',
  templateUrl: './chronicle-edit.component.html',
  styleUrls: ['./chronicle-edit.component.scss'],
})
export class ChronicleEditComponent implements OnInit {

  /*
  030100000410Empire and Exile0002002034151625D1EB07312FE50D8CFFFF083F34FF043005FF0B0F06FF034BFFFF1004FFE02FD512C335331E08AB642AD60907D3A82DD20E0B1C0A211B016F728A9732D413438B14B91D1F232C10009E7F1716415512110C222E201A290D261502242803192B27180EE2E8E0DDDEDADBE4E1EDDFDCE3E6
  */

  @Input() chronicle: Chronicle;

  public parsedChronicle: OathGame;

  public players = [
    { name: 'Chancellor', key: 'Chancellor' },
    { name: 'Blue',       key: 'Blue' },
    { name: 'Purple',     key: 'Brown' },
    { name: 'Red',        key: 'Red' },
    { name: 'White',      key: 'White' },
    { name: 'Yellow',     key: 'Yellow' }
  ];

  chronicleForm = new FormGroup({
    seed:             new FormControl('', Validators.compose([Validators.required, cleanText, validChronicleSeed])),
    description:      new FormControl('', Validators.compose([Validators.maxLength(255), cleanText])),

    nameChancellor:   new FormControl('', Validators.compose(nameValidators)),
    nameBlue:         new FormControl('', Validators.compose(nameValidators)),
    nameBrown:        new FormControl('', Validators.compose(nameValidators)),
    nameRed:          new FormControl('', Validators.compose(nameValidators)),
    nameWhite:        new FormControl('', Validators.compose(nameValidators)),
    nameYellow:       new FormControl('', Validators.compose(nameValidators)),

    actionChancellor: new FormControl('', Validators.compose(actionValidators)),
    actionBlue:       new FormControl('', Validators.compose(actionValidators)),
    actionBrown:      new FormControl('', Validators.compose(actionValidators)),
    actionRed:        new FormControl('', Validators.compose(actionValidators)),
    actionWhite:      new FormControl('', Validators.compose(actionValidators)),
    actionYellow:     new FormControl('', Validators.compose(actionValidators))
  });

  constructor(
    private router: Router,
    private chronicleService: ChronicleService
  ) { }

  ngOnInit() {
    if (!this.chronicle) { this.chronicle = CreateChronicle(); }
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

  async createNewChronicle() {
    const form = this.chronicleForm;

    const chronicle: Chronicle = {
      timestamp: Date.now(),

      seed: form.get('seed').value,
      desc: form.get('description').value,

      playerNames: {
        [PlayerColor.Chancellor]: form.get('nameChancellor').value,
        [PlayerColor.Blue]:       form.get('nameBlue').value,
        [PlayerColor.Brown]:      form.get('nameBrown').value,
        [PlayerColor.Red]:        form.get('nameRed').value,
        [PlayerColor.White]:      form.get('nameWhite').value,
        [PlayerColor.Yellow]:     form.get('nameYellow').value,
      },

      playerActions: {
        [PlayerColor.Chancellor]: form.get('actionChancellor').value,
        [PlayerColor.Blue]:       form.get('actionBlue').value,
        [PlayerColor.Brown]:      form.get('actionBrown').value,
        [PlayerColor.Red]:        form.get('actionRed').value,
        [PlayerColor.White]:      form.get('actionWhite').value,
        [PlayerColor.Yellow]:     form.get('actionYellow').value,
      }
    };

    const doc = await this.chronicleService.addChronicle(chronicle);
    this.router.navigate(['/view-chronicle', doc.ref.id]);
  }

}
