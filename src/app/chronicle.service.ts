import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { first } from 'rxjs/operators';

import { parseOathTTSSavefileString } from '@seiyria/oath-parser';

import { Chronicle, OathGame } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChronicleService {

  private chronicleCollection: AngularFirestoreCollection<Chronicle>;

  constructor(private afs: AngularFirestore) {
    this.init();
  }

  private init(): void {
    this.chronicleCollection = this.afs.collection<Chronicle>('chronicles');
  }

  parseChronicle(seed: string): OathGame {
    return parseOathTTSSavefileString(seed);
  }

  async addChronicle(chronicle: Chronicle): Promise<AngularFirestoreDocument> {
    chronicle.id = this.afs.createId();

    const doc = this.chronicleCollection.doc(chronicle.id);
    await doc.set(chronicle);

    return doc;
  }

  getChronicle(id: string): Observable<Chronicle> {
    return this.afs.doc<Chronicle>(`chronicles/${id}`).valueChanges().pipe(first());
  }
}
