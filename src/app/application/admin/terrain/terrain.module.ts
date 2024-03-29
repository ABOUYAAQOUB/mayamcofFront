import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerrainRoutingModule } from './terrain-routing.module';
import { ConsultComponent } from './consult/consult.component';
import { EditComponent } from './edit/edit.component';
import { ShearModule } from 'src/app/_shear/shear.module';
import { DevisPdfComponent } from './devis-pdf/devis-pdf.component';


@NgModule({
  declarations: [
    ConsultComponent,
    EditComponent,
    DevisPdfComponent
  ],
  imports: [
    CommonModule,
    TerrainRoutingModule,
    ShearModule
  ]
})
export class TerrainModule { }
