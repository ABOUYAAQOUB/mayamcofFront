import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandeRoutingModule } from './commande-routing.module';

import { ConsulteComponent } from './consulte/consulte.component';
import { ShearModule } from 'src/app/_shear/shear.module';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    ConsulteComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    CommandeRoutingModule,
    ShearModule
  ]
})
export class CommandeModule { }
