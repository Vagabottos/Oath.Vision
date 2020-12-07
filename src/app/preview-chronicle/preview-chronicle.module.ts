import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviewChroniclePageRoutingModule } from './preview-chronicle-routing.module';

import { PreviewChroniclePage } from './preview-chronicle.page';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PreviewChroniclePageRoutingModule,
    SharedModule
  ],
  declarations: [PreviewChroniclePage]
})
export class PreviewChroniclePageModule {}
