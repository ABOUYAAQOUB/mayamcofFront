import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"dashboard",
    loadChildren:()=>import('./dashboard/dashboard.module').then(app=>app.DashboardModule)
  },
  {
    path:"client",
    loadChildren:()=>import('./client/client.module').then(app=>app.ClientModule)
  },
  {
    path:"tache",
    loadChildren:()=>import('./tache/tache.module').then(app=>app.TacheModule)
  },
  {
    path:"fournisseur",
    loadChildren:()=>import('./fournisseur/fournisseur.module').then(app=>app.FournisseurModule)
  },
  {
    path:"construction/:id",
    loadChildren:()=>import('./construction/construction.module').then(app=>app.ConstructionModule)
  },
  {
    path:"commande",
    loadChildren:()=>import('./commande/commande.module').then(app=>app.CommandeModule)
  },
  {
    path:"consommation/:id",
    loadChildren:()=>import('./consommation/consommation.module').then(app=>app.ConsommationModule)
  },
  {
    path:"produit",
    loadChildren:()=>import('./produit/produit.module').then(app=>app.ProduitModule)
  }
  {
    path:"employer",
    loadChildren:()=>import('./employer/employer.module').then(app=>app.EmployerModule)
  },
  {
    path:"terrain",
    loadChildren:()=>import('./terrain/terrain.module').then(app=>app.TerrainModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
