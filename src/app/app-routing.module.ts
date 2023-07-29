import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationModule } from './application/application.module';
import { AppModule } from './app.module';

const routes: Routes = [
  {
    path:"mayamcof",
    loadChildren:()=>import('./application/application.module').then(app=>app.ApplicationModule)
  },
  {
    path:"**",
    redirectTo:"mayamcof/admin/dashboard",
    pathMatch:"full"
  },
  {
    path:"",
    redirectTo:"mayamcof/admin/dashboard",
    pathMatch:"full"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
