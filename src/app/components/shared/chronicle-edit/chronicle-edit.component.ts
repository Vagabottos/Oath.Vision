import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ChronicleService } from '../../../services/chronicle.service';

import { Chronicle, CreateChronicle, OathGame, PlayerColor } from '../../../interfaces';
import { UIService } from '../../../services/ui.service';
import { cleanText, validChildSeed, validChronicleSeed } from './validators';

const nameValidators = [Validators.maxLength(25), cleanText];
const actionValidators = [Validators.maxLength(255), cleanText];

@Component({
  selector: 'app-chronicle-edit',
  templateUrl: './chronicle-edit.component.html',
  styleUrls: ['./chronicle-edit.component.scss'],
})
export class ChronicleEditComponent implements OnInit {

  @Input() seed: string;
  @Input() chronicle: Chronicle;
  @Input() parentChronicle?: Chronicle;

  public parsedChronicle: OathGame;
  public parsedParentChronicle: OathGame;

  chronicleForm = new FormGroup({
    seed:             new FormControl('', Validators.compose([Validators.required, cleanText, validChronicleSeed])),
    description:      new FormControl('', Validators.compose([Validators.maxLength(1000), cleanText])),

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
    private route: ActivatedRoute,
    private uiService: UIService,
    public chronicleService: ChronicleService
  ) { }

  ngOnInit() {
    if (!this.chronicle) { this.chronicle = CreateChronicle(); }
    if (this.parentChronicle) {
      this.parsedParentChronicle = this.chronicleService.parseChronicle(this.parentChronicle.seed);
      this.chronicleForm.get('seed').setValidators(
        [Validators.required, cleanText, validChronicleSeed].concat([validChildSeed(this.parsedParentChronicle)]
      ));
    }

    if (!this.chronicle.seed) {
      const seed = this.route.snapshot.queryParamMap.get('seed');
      this.chronicleForm.get('seed').setValue(seed);
      this.parseSeed();
    }

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
    if (!this.parsedChronicle) { return; }

    const form = this.chronicleForm;

    const chronicle: Chronicle = {
      timestamp: Date.now(),

      name: this.parsedChronicle.chronicleName,
      taleNumber: this.parsedChronicle.gameCount,
      seed: form.get('seed').value.trim(),
      desc: form.get('description').value.trim(),

      playerNames: {
        [PlayerColor.Chancellor]: form.get('nameChancellor').value.trim(),
        [PlayerColor.Blue]:       form.get('nameBlue').value.trim(),
        [PlayerColor.Brown]:      form.get('nameBrown').value.trim(),
        [PlayerColor.Red]:        form.get('nameRed').value.trim(),
        [PlayerColor.White]:      form.get('nameWhite').value.trim(),
        [PlayerColor.Yellow]:     form.get('nameYellow').value.trim(),
      },

      playerActions: {
        [PlayerColor.Chancellor]: form.get('actionChancellor').value.trim(),
        [PlayerColor.Blue]:       form.get('actionBlue').value.trim(),
        [PlayerColor.Brown]:      form.get('actionBrown').value.trim(),
        [PlayerColor.Red]:        form.get('actionRed').value.trim(),
        [PlayerColor.White]:      form.get('actionWhite').value.trim(),
        [PlayerColor.Yellow]:     form.get('actionYellow').value.trim(),
      }
    };

    if (this.parentChronicle) {
      chronicle.parentId = this.parentChronicle.id;
    }

    this.uiService.confirm(
      'Submit Chronicle',
      'Are you sure you want to submit this Chronicle? You will not be able to edit it afterwards.',
      'Yes, Submit',
      async () => {
        const doc = await this.chronicleService.addChronicle(chronicle);
        this.chronicleForm.reset();
        this.router.navigate(['/view-chronicle', doc.ref.id]);
      }
    );
  }

}
