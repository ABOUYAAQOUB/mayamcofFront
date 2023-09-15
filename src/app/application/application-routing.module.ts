import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterpageComponent } from '../_shear/masterpage/masterpage.component';

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
    path:"admin",
    loadChildren:()=>import('./admin/admin.module').then(app=>app.AdminModule)
  },
  {
    path:"user",
    loadChildren:()=>import('./user/user.module').then(app=>app.UserModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
