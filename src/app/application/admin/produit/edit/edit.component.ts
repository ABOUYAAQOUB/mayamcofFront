import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'src/app/_core/models/produit';
import { ProduitService } from 'src/app/_core/service/produit.service';
import { EditComponentP } from 'src/app/_shear/dialog/edit/edit.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  
  produit:Produit|any;
  checkparam:number|any;
 

  constructor(private builder:FormBuilder,private serviceProduit:ProduitService,private _snackBar: MatSnackBar,private route:Router,private routeparam:ActivatedRoute) {   

  }

  ngOnInit(): void {

    this.checkparam = this.routeparam.snapshot.paramMap.get('id');
    this.initialFormGroupe();
    if(this.checkparam){
      this.getProduit(this.checkparam);
    }
  }

  getProduit(id:number){
    this.serviceProduit.getProduit(id).subscribe(res =>{
      this.registerForm.setValue({
        nom:res.nom
      });
    });
  }
  
  initialFormGroupe(): void {
    this.registerForm = new FormGroup({
      nom: new FormControl(null, [Validators.required,Validators.minLength(3)])
    });
  }
  openSnackBar(name:string) {
    this._snackBar.openFromComponent(EditComponentP, {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
      data: 'le Produit a éte Bien '+name
    });

  }

  registerForm:FormGroup = this.builder.group({
      nom:new FormControl('',Validators.compose([Validators.required,Validators.minLength(3)]))
  });

 sub(){
  if(this.registerForm.valid){

    if(this.checkparam){

      this.update();
      
    }else{
      this.add()
      
    }    

  }

 }

add(){
  this.produit={
    nom:this.registerForm.get('nom')?.value
  };
    this.serviceProduit.addProduit(this.produit).subscribe({
      next:data =>{
        this.openSnackBar("Ajouter");
        this.route.navigateByUrl('/mayamcof/admin/produit');
      },
      error:err =>{
        if(err.error.champ=="Nom")
          this.registerForm.get('nom')?.setErrors({'exist':true});
      }
    });
}

update(){
  this.produit={
    id:this.checkparam,
    nom:this.registerForm.get('nom')?.value
  };

  this.serviceProduit.updateProduit(this.produit).subscribe({
    next:data =>{
      this.openSnackBar("Modifier");
      this.route.navigateByUrl('/mayamcof/admin/produit');
    },
    error:err =>{
      if(err.error.champ=="Nom")
        this.registerForm.get('nom')?.setErrors({'exist':true});
    }
  });
}



}
