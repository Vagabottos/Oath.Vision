import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewChroniclePageRoutingModule } from './view-chronicle-routing.module';

import { ViewChroniclePage } from './view-chronicle.page';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewChroniclePageRoutingModule,
    SharedModule
  ],
  declarations: [ViewChroniclePage]
})
export class ViewChroniclePageModule {}
