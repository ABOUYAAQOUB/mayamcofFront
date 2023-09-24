import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsulteComponent } from './consulte/consulte.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path:"",
    component:ConsulteComponent
  },
  {
    path:"Ajouter",
    component:EditComponent
  },
  {
    path:"Modifier/:id",
    component:EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseurRoutingModule { }
