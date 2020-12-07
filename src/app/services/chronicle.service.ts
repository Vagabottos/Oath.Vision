import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryDocumentSnapshot } from '@angular/fire/firestore';

import { first, map } from 'rxjs/operators';

import { parseOathTTSSavefileString } from '@seiyria/oath-parser';

import { Chronicle, OathGame, Suit } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChronicleService {

  private chronicleCollection: AngularFirestoreCollection<Chronicle>;

  public readonly suitOrder: Array<{ suit: string, ref: Suit }> = [
    { suit: 'arcane',   ref: Suit.Arcane },
    { suit: 'beast',    ref: Suit.Beast },
    { suit: 'discord',  ref: Suit.Discord },
    { suit: 'hearth',   ref: Suit.Hearth },
    { suit: 'nomad',    ref: Suit.Nomad },
    { suit: 'order',    ref: Suit.Order }
  ];

  public readonly players = [
    { name: 'Chancellor', key: 'Chancellor' },
    { name: 'Blue',       key: 'Blue' },
    { name: 'Brown',      key: 'Brown' },
    { name: 'Red',        key: 'Red' },
    { name: 'White',      key: 'White' },
    { name: 'Yellow',     key: 'Yellow' }
  ];

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

  getChildChronicles(parentId: string): Observable<Chronicle[]> {
    return this.afs
      .collection('chronicles', ref => ref.where('parentId', '==', parentId))
      .valueChanges()
      .pipe(first()) as Observable<Chronicle[]>;
  }

  getChronicleList(after?: QueryDocumentSnapshot<Chronicle>, search?: string): Observable<Array<QueryDocumentSnapshot<Chronicle>>> {
    return this.afs
      .collection('chronicles', ref => {
        let baseSearch = ref.orderBy('timestamp', 'desc');

        if (search) {
          baseSearch = baseSearch.where('name', '==', search);
        }

        if (after) {
          baseSearch = baseSearch.startAfter(after);
        }

        return baseSearch.limit(15);
      })
      .snapshotChanges()
      .pipe(map(d => d.map(x => x.payload.doc)))
      .pipe(first()) as Observable<Array<QueryDocumentSnapshot<Chronicle>>>;
  }
}
