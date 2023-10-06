import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstructionRoutingModule } from './construction-routing.module';
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
    ConstructionRoutingModule,
    ShearModule,
    
  ]
})
export class ConstructionModule { }
