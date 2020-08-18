import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewChroniclePage } from './new-chronicle.page';

const routes: Routes = [
  {
    path: '',
    component: NewChroniclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewChroniclePageRoutingModule {}
