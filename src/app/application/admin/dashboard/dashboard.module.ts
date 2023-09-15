import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ContainerComponent } from './container/container.component';
import { ShearModule } from 'src/app/_shear/shear.module';


@NgModule({
  declarations: [
    ContainerComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShearModule
  ]
})
export class DashboardModule { }
