import { AfterViewInit, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TacheRoutingModule } from './tache-routing.module';
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
    TacheRoutingModule,
    ShearModule
  ]
})
export class TacheModule {

 }
