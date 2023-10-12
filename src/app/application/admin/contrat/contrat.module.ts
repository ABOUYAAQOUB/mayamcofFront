import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratRoutingModule } from './contrat-routing.module';
import { EditComponent } from './edit/edit.component';
import { ConsulteComponent } from './consulte/consulte.component';
import { ShearModule } from 'src/app/_shear/shear.module';


@NgModule({
  declarations: [
    EditComponent,
    ConsulteComponent
  ],
  imports: [
    CommonModule,
    ContratRoutingModule,
    ShearModule
  ]
})
export class ContratModule { }
