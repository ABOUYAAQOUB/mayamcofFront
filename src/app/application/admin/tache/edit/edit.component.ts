import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Tache } from 'src/app/_core/models/tache';
import { TacheService } from 'src/app/_core/service/tache.service';
import { EditComponentP } from 'src/app/_shear/dialog/edit/edit.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form!: FormGroup;
  tache : Tache|any;
  id:number|any ;

  constructor(private _snackBar: MatSnackBar,private tacheService: TacheService,private router:Router,private activeRouter: ActivatedRoute){}
  
  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.paramMap.get('id');
    this.initialFormGroupe();
    if(this.id){
      this.getTache();
    }
  }

  initialFormGroupe(): void {
    this.form = new FormGroup({
      libele: new FormControl(null, [Validators.required,Validators.minLength(3),Validators.pattern("[^0-9].*")])
    });
  }

  onSubmit(): void {
    if(this.id){
      this.update();
      this.openSnackBar("Modifier");
    }else{
      this.add();
      this.openSnackBar("Ajouter");
    }
    
  }

  openSnackBar(name:string) {
    this._snackBar.openFromComponent(EditComponentP, {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
      data: 'la Tache a éte Bien '+name
    });

  }

  add(){
    this.tache = {libele:this.form.get('libele')?.value};
    this.tacheService.addTache(this.tache).subscribe({
      next: data => {
        this.router.navigateByUrl('mayamcof/admin/tache');
      },
      error: err => {
        this.form.get('libele')?.setErrors({'exist': true});
      }
    });
  }

  getTache(){
    this.tacheService.getTache(this.id).subscribe(res=>{
       this.form.setValue({
        libele:res.libele
       })
    })
  }

  update(){
    this.tache = {id:this.id,libele:this.form.get('libele')?.value};
    this.tacheService.updateTache(this.tache).subscribe({
      next: data => {
        this.router.navigateByUrl('mayamcof/admin/tache');
      },
      error: err => {
        this.form.get('libele')?.setErrors({'exist': true});
      }
    });
  }

  retourn(){
    this.router.navigateByUrl('mayamcof/admin/tache');
  }

}
