import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { connect } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from 'src/app/_core/models/commande';
import { DetailCommande } from 'src/app/_core/models/detail-commande';
import { Fournisseur } from 'src/app/_core/models/fournisseur';
import { Produit } from 'src/app/_core/models/produit';
import { CommandeService } from 'src/app/_core/service/commande.service';
import { DetailcommandeService } from 'src/app/_core/service/detailcommande.service';
import { FournisseurService } from 'src/app/_core/service/fournisseur.service';
import { ProduitService } from 'src/app/_core/service/produit.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{

  public detailCommandeForm: FormGroup;
  fournisseurs:Fournisseur|any;
  produits:Produit|any;
  commande:Commande|any;
  detailCommande:DetailCommande|any;
  isCheckAll: boolean = false;
  checkparam:number|any;

  constructor(private route:Router,private routeparam:ActivatedRoute,private fb: FormBuilder,private produitService:ProduitService,private fournisseurService:FournisseurService,private commandeService:CommandeService,private detailCommandeService:DetailcommandeService) {
    
    this.detailCommandeForm = this.fb.group({
        tableRows: this.fb.array([],[Validators.required]),
        date: new FormControl('',[Validators.required]),
        fournisseur: new FormControl<Fournisseur|null>(null,[Validators.required])
      });

    this.checkparam = this.routeparam.snapshot.paramMap.get('id');

    if(this.checkparam){
        this.commandeService.getCommande(this.checkparam).subscribe(res =>{
          console.log(res);
          this.commande = res;
          this.detailCommandeForm.setValue({
            tableRows:[],
            date:new Date(res.datecommande),
            fournisseur:res.fournisseur.id
          });
          console.log(this.detailCommandeForm.value);
        });
        this.detailCommandeService.getDetailCommandesByCommande(this.checkparam).subscribe(res =>{
          console.log(res);
          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            const test = this.fb.group({
              prix: [element.prix,[Validators.required]],
              quantite: [element.quantite,[Validators.required]],
              produit: new FormControl(element.produit.id,Validators.compose([Validators.required])),
              idDetaliCommande: [element.id]
            });

            this.addRowupdate(test);
          }
        });
    }else{        
      this.addRow();
    }
    
    
    
  }
  ngOnInit(): void {
       this.getFournisseurs();
       this.getProduits();
  }

  sub(){
    if(this.detailCommandeForm.valid){

      if(this.checkparam){

        this.update();
        this.route.navigateByUrl('mayamcof/admin/commande');
        
      }else{
        // ajouter code          
        this.add();
        this.route.navigateByUrl('mayamcof/admin/commande');
      }
      
    }
  }
// getFormControls.controls[i].get('produit')?.getRawValue() == "prod1"
  createFormGroup(): FormGroup {
    return this.fb.group({
      prix: ['',[Validators.required]],
      quantite: ['',[Validators.required]],
      produit: new FormControl(null,Validators.compose([Validators.required])),
      idDetaliCommande: ['0']
    });
  }

  get getFormControls() {
    const control = this.detailCommandeForm.get('tableRows') as FormArray;
    return control;
  }

  addRow() {
    const control =  this.detailCommandeForm.get('tableRows') as FormArray;
    control.push(this.createFormGroup());
  }

  addRowupdate(test:FormGroup) {
    const control =  this.detailCommandeForm.get('tableRows') as FormArray;
    control.push(test);
  }

  // checkAll(checkVal: boolean) {
    
  //   this.getFormControls.controls.forEach(formGroup => {
  //     formGroup.get('ischecked')?.setValue(checkVal);
  //   });
  // }

  // onStatusChange(event:any, index: number) {
  //   //debugger
  //   if(event.target.value == 'deactive'){
  //     const control =  this.detailCommandeForm.get('tableRows') as FormArray;
  //     control.controls[index].get('state')?.disable();
  //     control.controls[index].get('city')?.disable();
  //   } else {
  //     const control =  this.detailCommandeForm.get('tableRows') as FormArray;
  //     control.controls[index].get('state')?.enable();
  //     control.controls[index].get('city')?.enable();
  //   }
  // }

  removeEmployee(index:number) {

    const control =  this.detailCommandeForm.get('tableRows') as FormArray;

    const id = control.controls[index].getRawValue().idDetaliCommande;
    
    this.detailCommandeService.deleteDetailCommande(id).subscribe();
    
    control.removeAt(index);
  }


  // onSaveForm() {
  //   const formValue = this.detailCommandeForm.value;
  //   console.log(this.detailCommandeForm.get('tableRows')?.valid);
  // }

  getFournisseurs(){
    this.fournisseurService.getFournisseurs().subscribe(res =>{
        this.fournisseurs = res;
    });
  }

  getProduits(){
    this.produitService.getProduits().subscribe(res =>{
        this.produits = res;
    });
  } 

  add(){
    this.commande = {
      datecommande:(this.detailCommandeForm.get('date')?.value).toLocaleDateString().split("/").reverse().join("-"),
      fournisseur:{id:this.detailCommandeForm.get('fournisseur')?.value}
    };
    
    this.commandeService.addCommande(this.commande).subscribe(res =>{
              this.commande = res;
              console.log(this.commande);
      for (let index = 0; index < this.detailCommandeForm.get('tableRows')?.value.length; index++) {
        const element = this.detailCommandeForm.get('tableRows')?.value[index];
        this.detailCommande = {
          prix:element.prix,
          quantite:element.quantite,
          commande:this.commande,
          produit:{id:element.produit}
        };
          
        this.detailCommandeService.addDetailCommande(this.detailCommande).subscribe(res =>{
          console.log(res);
        });
      }
    });
    
      //  console.log(this.commande);
    //this.commandeService.addCommande()
   // console.log('--------------- les Detail -----------------');
    // console.log(this.detailCommandeForm.get('tableRows')?.value);
  }

  update(){
    const control =  this.detailCommandeForm.get('tableRows') as FormArray;

        for (let index = 0; index < control.controls.length; index++) {

          const element = control.controls[index].getRawValue();
          
          if(element.idDetaliCommande == 0){
              
              this.detailCommande = {
                prix:element.prix,
                quantite:element.quantite,
                commande:this.commande,
                produit:{id:element.produit}
              };
              this.detailCommandeService.addDetailCommande(this.detailCommande).subscribe();
          }else{
            this.detailCommande = {
              id:element.idDetaliCommande,
              prix:element.prix,
              quantite:element.quantite,
              commande:this.commande,
              produit:{id:element.produit}
            };
            this.detailCommandeService.updateDetailCommande(this.detailCommande).subscribe();
          }

        }
  }
  
 
}
