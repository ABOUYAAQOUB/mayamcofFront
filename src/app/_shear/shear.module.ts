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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { SuppressionComponent } from './dialog/suppression/suppression.component';
import { EditComponentP } from './dialog/edit/edit.component';
import { MatSnackBarModule,} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

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
  MatPaginatorModule,
  ReactiveFormsModule,
  MatDialogModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatRadioModule,
  MatSlideToggleModule
]


@NgModule({
  declarations: [
    MasterpageComponent,
    NavComponent,
    SideComponent,
    SuppressionComponent,
    EditComponentP
  ],
  imports: [
    CommonModule,
    material,
    RouterModule,
  
  ],
  exports:[
    material,
    SuppressionComponent,
    EditComponentP
  ]
})
export class ShearModule { }
