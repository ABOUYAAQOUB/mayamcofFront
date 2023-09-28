import { Component,Inject,inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponentP {
 
constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string){}
  snackBarRef = inject(MatSnackBarRef);  

}
