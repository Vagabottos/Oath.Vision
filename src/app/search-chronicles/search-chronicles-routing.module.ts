import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchChroniclesPage } from './search-chronicles.page';

const routes: Routes = [
  {
    path: '',
    component: SearchChroniclesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchChroniclesPageRoutingModule {}
