import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewChroniclePageRoutingModule } from './new-chronicle-routing.module';

import { NewChroniclePage } from './new-chronicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewChroniclePageRoutingModule
  ],
  declarations: [NewChroniclePage]
})
export class NewChroniclePageModule {}
