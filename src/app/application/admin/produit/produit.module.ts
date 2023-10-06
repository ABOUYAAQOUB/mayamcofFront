import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitRoutingModule } from './produit-routing.module';
import { ConsulteComponent } from './consulte/consulte.component';
import { EditComponent } from './edit/edit.component';
import { ShearModule } from 'src/app/_shear/shear.module';


@NgModule({
  declarations: [
    ConsulteComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ProduitRoutingModule,
    ShearModule
  ]
})
export class ProduitModule { }
