import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"dashboard",
    loadChildren:()=>import('./dashboard/dashboard.module').then(app=>app.DashboardModule)
  },
  {
    path:"Fournisseur",
    loadChildren:()=>import('./fournisseur/fournisseur.module').then(app=>app.FournisseurModule)
  },
  {
    path:"client",
    loadChildren:()=>import('./client/client.module').then(app=>app.ClientModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
