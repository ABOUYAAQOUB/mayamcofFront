import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Fournisseur } from 'src/app/_core/models/fournisseur';
import { FournisseurService } from 'src/app/_core/service/fournisseur.service';
import { EditComponentP } from 'src/app/_shear/dialog/edit/edit.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  
  fournisseur:Fournisseur|any;
  checkparam : number|any;

  constructor(private _snackBar: MatSnackBar,private route:Router,private routeparam:ActivatedRoute,private builder:FormBuilder,private serviceFournisseur:FournisseurService){}
  
  ngOnInit(): void {

    this.checkparam = this.routeparam.snapshot.paramMap.get('id');
    if(this.checkparam){
       this.getFourniseur();
    }
    console.log(this.routeparam.snapshot.paramMap.get('id'));
  }


  registerForm:FormGroup = this.builder.group({
    ice:new FormControl('',Validators.compose([Validators.required,Validators.maxLength(14),Validators.minLength(14),Validators.pattern(/^\d+$/)])),
    nom: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[^0-9].*/)])),
    tel:new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^\d+$/),Validators.minLength(10)])),
  });

  openSnackBar(name:string) {
    this._snackBar.openFromComponent(EditComponentP, {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
      data: 'le Fournisseur a éte Bien '+name
    });

  }

  isSubmited(){
    if(this.registerForm.valid){
      
      if(this.checkparam != null){

        this.update();
        this.openSnackBar("Modifier");
       
      }else{

        this.add();
        this.openSnackBar("Ajouter");
      }     

    }else {
      
    }
  }

  add(){
        this.fournisseur = {
          ice :this.registerForm.get('ice')?.value,
          nom : this.registerForm.get('nom')?.value,
          tel :this.registerForm.get('tel')?.value,
        } 
        
     

        this.serviceFournisseur.addFournisseur(this.fournisseur).subscribe({
            next:data =>{
              this.route.navigateByUrl('/mayamcof/admin/fournisseur');
            },
            error:err =>{
              this.registerForm.get('ice')?.setErrors({'exist':true});
            }
          });
  }

  update(){
    this.fournisseur = {
      id : this.checkparam,
      ice :this.registerForm.get('ice')?.value,
      nom : this.registerForm.get('nom')?.value,
      tel :this.registerForm.get('tel')?.value,
    } 

    this.serviceFournisseur.updateFournisseur(this.fournisseur).subscribe({
      next:data =>{
        this.route.navigateByUrl('/mayamcof/admin/fournisseur');
      },
      error:err =>{
        this.registerForm.get('ice')?.setErrors({'exist':true});
      }
    });
    
  }

  getFourniseur(){
    this.serviceFournisseur.getFournisseur(this.checkparam).subscribe(res =>{
      this.registerForm.setValue({
        ice:res.ice,
        nom:res.nom,
        tel:res.tel
      });
    });
  }
  
}
