import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultComponent } from './consult/consult.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path:"",
    component:ConsultComponent
  },
  {
    path:"ajouter",
    component:EditComponent
  },
  {
    path:"modifier/:idT",
    component:EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravaillerRoutingModule { }
