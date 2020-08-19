import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewChroniclePageRoutingModule } from './new-chronicle-routing.module';

import { NewChroniclePage } from './new-chronicle.page';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewChroniclePageRoutingModule,
    SharedModule
  ],
  declarations: [NewChroniclePage]
})
export class NewChroniclePageModule {}
