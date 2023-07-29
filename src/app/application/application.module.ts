import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ShearModule } from '../_shear/shear.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    ShearModule
  ]
})
export class ApplicationModule { }
