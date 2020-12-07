import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviewChroniclePage } from './preview-chronicle.page';

const routes: Routes = [
  {
    path: '',
    component: PreviewChroniclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviewChroniclePageRoutingModule {}
