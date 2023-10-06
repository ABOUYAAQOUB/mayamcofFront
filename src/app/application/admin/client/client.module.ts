import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { EditComponent } from './edit/edit.component';
import { ConsultComponent } from './consult/consult.component';
import { ShearModule } from 'src/app/_shear/shear.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditComponent,
    ConsultComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ShearModule,
  ]
})
export class ClientModule { }
