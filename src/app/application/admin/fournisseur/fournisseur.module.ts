import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FournisseurRoutingModule } from './fournisseur-routing.module';
import { ConsulteComponent } from './consulte/consulte.component';
import { EditComponent } from './edit/edit.component';
import { share } from 'rxjs';
import { ShearModule } from 'src/app/_shear/shear.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';


@NgModule({
  declarations: [
    ConsulteComponent,
    EditComponent,
    DialogExampleComponent
  ],
  imports: [
    CommonModule,
    FournisseurRoutingModule,
    ShearModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class FournisseurModule { }
