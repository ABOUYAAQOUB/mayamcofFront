import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterpageComponent } from './masterpage/masterpage.component';
import { NavComponent } from './nav/nav.component';
import { SideComponent } from './side/side.component';



@NgModule({
  declarations: [
    MasterpageComponent,
    NavComponent,
    SideComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ShearModule { }
