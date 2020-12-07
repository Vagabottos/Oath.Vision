
import { AbstractControl } from '@angular/forms';
import { parseOathTTSSavefileString } from '@seiyria/oath-parser';
import { CensorSensor } from 'censor-sensor';
import { OathGame } from '../../../interfaces';

const censor = new CensorSensor();

export const defaultSeed = `030100000110Empire and Exile0000000123450403FFFFFFFFFFFF0724FFFFFFFFFFFFFFFFFFFF0B19FFFFFFFFFFFFFFFFFFFF000000`;

export function validChildSeed(parentGame: OathGame) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    try {
      const value = control.value.trim();
      const childGame: OathGame = parseOathTTSSavefileString(value);

      if (childGame.gameCount !== parentGame.gameCount + 1) { return { playCount: true }; }
      if (childGame.chronicleName !== parentGame.chronicleName) { return { chronicleName: true }; }

    } catch {
      return { validSeed: true };
    }

    return null;
  };
}

export function validChronicleSeed(control: AbstractControl): { [key: string]: any } | null {
  try {
    const value = control.value.trim();
    if (value === defaultSeed) { return { defaultSeed: true }; }

    const parsed = parseOathTTSSavefileString(value);
    if (parsed.version.major < 3 && parsed.version.minor < 1) { return { validVersion: true }; }
    if (parsed.version.major > 3) { return { validVersion: true }; }
  } catch {
    return { validSeed: true };
  }

  return null;
}

export function cleanText(control: AbstractControl): { [key: string]: any } | null {
  return censor.isProfaneIsh(control.value || '') ? { rude: true } : null;
}
