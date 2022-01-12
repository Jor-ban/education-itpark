import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module')
      .then(m => m.HomeModule)
  },
  {
    path: 'working',
    loadChildren: () => import('./onProgress/onProgress.module')
      .then(m => m.OnProgressModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {scrollPositionRestoration: 'enabled'}
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
