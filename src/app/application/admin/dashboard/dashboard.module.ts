import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ContainerComponent } from './container/container.component';
import { ShearModule } from 'src/app/_shear/shear.module';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
  declarations: [
    ContainerComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShearModule,
    CanvasJSAngularChartsModule
  ]
})
export class DashboardModule { }
