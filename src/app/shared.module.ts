import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ChronicleEditComponent } from './components/shared/chronicle-edit/chronicle-edit.component';
import { NavLinksComponent } from './components/shared/nav-links/nav-links.component';
import { SpriteComponent } from './components/shared/sprite/sprite.component';

@NgModule({
  declarations: [
    NavLinksComponent,
    ChronicleEditComponent,
    SpriteComponent
  ],
  exports: [
    NavLinksComponent,
    ChronicleEditComponent,
    SpriteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
