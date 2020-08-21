import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryChroniclePage } from './history-chronicle.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryChroniclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryChroniclePageRoutingModule {}
