import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ChronicleEditComponent } from './components/shared/chronicle-edit/chronicle-edit.component';
import { NavLinksComponent } from './components/shared/nav-links/nav-links.component';
import { SpriteComponent } from './components/shared/sprite/sprite.component';
import { ViewCardComponent } from './components/modals/view-card/view-card.component';
import { ChronicleCardComponent } from './components/shared/chronicle-card/chronicle-card.component';
import { ChildrenChroniclesComponent } from './components/modals/childrenchronicles/childrenchronicles.component';
import { HistoryTreeComponent } from './components/shared/history-tree/history-tree.component';

@NgModule({
  declarations: [
    NavLinksComponent,
    ChronicleEditComponent,
    SpriteComponent,
    ChronicleCardComponent,
    ViewCardComponent,
    ChildrenChroniclesComponent,
    HistoryTreeComponent
  ],
  exports: [
    NavLinksComponent,
    ChronicleEditComponent,
    SpriteComponent,
    ChronicleCardComponent,
    ViewCardComponent,
    ChildrenChroniclesComponent,
    HistoryTreeComponent
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
