import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactureRoutingModule } from './facture-routing.module';
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
    FactureRoutingModule,
    ShearModule
  ]
})
export class FactureModule { }
