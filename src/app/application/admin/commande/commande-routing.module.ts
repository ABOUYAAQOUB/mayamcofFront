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
    path:"ajouter",
    component:EditComponent
  },
  {
    path:"modifier/:id",
    component:EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeRoutingModule { }
