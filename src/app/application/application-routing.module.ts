import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterpageComponent } from '../_shear/masterpage/masterpage.component';
import { FacturePdfComponent } from './admin/facture/facture-pdf/facture-pdf.component';
import { DevisPdfComponent } from './admin/terrain/devis-pdf/devis-pdf.component';

const routes: Routes = [
  {
    path:'',
    component:MasterpageComponent,
    children:[
      {
        path:"admin",
        loadChildren:()=>import('./admin/admin.module').then(app=>app.AdminModule)    
      }
     ]
  },
  {
    path:"user",
    loadChildren:()=>import('./user/user.module').then(app=>app.UserModule)
  },
  { 
    path:'admin/facture/generete/:id', 
    component:FacturePdfComponent
  },
  {
    path:"admin/terrain/generete/:id",
    component:DevisPdfComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
