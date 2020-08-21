import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryChroniclePageRoutingModule } from './history-chronicle-routing.module';

import { HistoryChroniclePage } from './history-chronicle.page';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryChroniclePageRoutingModule,

    SharedModule
  ],
  declarations: [HistoryChroniclePage]
})
export class HistoryChroniclePageModule {}
