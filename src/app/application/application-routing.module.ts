import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
