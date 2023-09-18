import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterpageComponent } from './masterpage/masterpage.component';
import { NavComponent } from './nav/nav.component';
import { SideComponent } from './side/side.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
const material = [
  MatButtonModule,
  MatSidenavModule,
  MatSelectModule,
  MatFormFieldModule,
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatExpansionModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  FormsModule,
  MatTableModule,
  MatProgressBarModule,
  MatPaginatorModule
]


@NgModule({
  declarations: [
    MasterpageComponent,
    NavComponent,
    SideComponent
  ],
  imports: [
    CommonModule,
    material,
    RouterModule,
  
  ],
  exports:[
    material
  ]
})
export class ShearModule { }
