import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { EditComponent } from './edit/edit.component';
import { ConsultComponent } from './consult/consult.component';
import { ShearModule } from 'src/app/_shear/shear.module';


@NgModule({
  declarations: [
    EditComponent,
    ConsultComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    ShearModule,
  ]
})
export class EmployerModule { }
