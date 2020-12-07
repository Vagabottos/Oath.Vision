import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchChroniclesPageRoutingModule } from './search-chronicles-routing.module';

import { SearchChroniclesPage } from './search-chronicles.page';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SearchChroniclesPageRoutingModule,
    SharedModule
  ],
  declarations: [SearchChroniclesPage]
})
export class SearchChroniclesPageModule {}
