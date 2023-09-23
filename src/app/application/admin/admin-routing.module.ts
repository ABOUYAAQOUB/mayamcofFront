import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"dashboard",
    loadChildren:()=>import('./dashboard/dashboard.module').then(app=>app.DashboardModule)
  },
  {
    path:"tache",
    loadChildren:()=>import('./tache/tache.module').then(app=>app.TacheModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
