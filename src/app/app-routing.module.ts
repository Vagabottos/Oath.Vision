import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'new-chronicle',
    loadChildren: () => import('./pages/new-chronicle/new-chronicle.module').then( m => m.NewChroniclePageModule)
  },
  {
    path: 'from-chronicle/:id',
    loadChildren: () => import('./pages/new-chronicle/new-chronicle.module').then( m => m.NewChroniclePageModule)
  },
  {
    path: 'view-chronicle/:id',
    loadChildren: () => import('./pages/view-chronicle/view-chronicle.module').then( m => m.ViewChroniclePageModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
