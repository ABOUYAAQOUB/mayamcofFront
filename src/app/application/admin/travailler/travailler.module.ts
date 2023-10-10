import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravaillerRoutingModule } from './travailler-routing.module';
import { ShearModule } from 'src/app/_shear/shear.module';
import { ConsultComponent } from './consult/consult.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    ConsultComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    TravaillerRoutingModule,
    ShearModule,
  ]
})
export class TravaillerModule { }
