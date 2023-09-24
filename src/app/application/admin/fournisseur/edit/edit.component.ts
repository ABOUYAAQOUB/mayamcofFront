import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Fournisseur } from 'src/app/_core/models/fournisseur';
import { FournisseurService } from 'src/app/_core/service/fournisseur.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  
  fournisseur:Fournisseur|any;
  checkparam : number|any;

  constructor(private route:Router,private routeparam:ActivatedRoute,private builder:FormBuilder,private serviceFournisseur:FournisseurService){}
  
  ngOnInit(): void {

    this.checkparam = this.routeparam.snapshot.paramMap.get('id');
    this.getFourniseur();
    console.log(this.routeparam.snapshot.paramMap.get('id'));
  }


  registerForm:FormGroup = this.builder.group({
    ice:new FormControl('',Validators.compose([Validators.required,Validators.maxLength(14),Validators.minLength(14),Validators.pattern(/^\d+$/)])),
    nom: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[^0-9].*/)])),
    tel:new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^\d+$/)])),
  });


  isSubmited(){
    if(this.registerForm.valid){
      
      if(this.checkparam != null){

        this.update();
       
      }else{

        this.add();

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
