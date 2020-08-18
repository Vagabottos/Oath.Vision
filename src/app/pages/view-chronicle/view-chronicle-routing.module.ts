import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewChroniclePage } from './view-chronicle.page';

const routes: Routes = [
  {
    path: '',
    component: ViewChroniclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewChroniclePageRoutingModule {}
