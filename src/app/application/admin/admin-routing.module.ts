import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsulteComponent } from './fournisseur/consulte/consulte.component';
import { EditComponent } from './fournisseur/edit/edit.component';

const routes: Routes = [
  {
    path:"dashboard",
    loadChildren:()=>import('./dashboard/dashboard.module').then(app=>app.DashboardModule)
  },
  {
    path:"Fournisseur",
    loadChildren:()=>import('./fournisseur/fournisseur.module').then(app=>app.FournisseurModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
