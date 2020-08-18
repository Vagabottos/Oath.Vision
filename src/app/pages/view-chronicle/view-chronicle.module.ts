import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewChroniclePageRoutingModule } from './view-chronicle-routing.module';

import { ViewChroniclePage } from './view-chronicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewChroniclePageRoutingModule
  ],
  declarations: [ViewChroniclePage]
})
export class ViewChroniclePageModule {}
