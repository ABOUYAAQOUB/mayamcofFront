import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Consommation } from 'src/app/_core/models/consommation';
import { Produit } from 'src/app/_core/models/produit';
import { ConsommationService } from 'src/app/_core/service/consommation.service';
import { ProduitService } from 'src/app/_core/service/produit.service';
import { EditComponentP } from 'src/app/_shear/dialog/edit/edit.component';
import { SuppressionComponent } from 'src/app/_shear/dialog/suppression/suppression.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  p=1;
  form!:FormGroup;
  id:number|any ;
  produits:Produit|any
  consommations:Consommation[]|any;
  consommation:Consommation|any;

  constructor(private _snackBar: MatSnackBar,
    private ConsommationService:ConsommationService,
    private ProduitService:ProduitService,
    private router:Router,
    private activeRouter: ActivatedRoute,
    private fb : FormBuilder,
    public dialog: MatDialog){}


  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.paramMap.get('id');
    this.initialFormGroupe();
    this.getConsommations();
    this.getProduit();
  }

  getConsommations(){
    this.ConsommationService.getConsommationC(this.id).subscribe({
      next: data => {
        this.consommations = data;
        this.displayItems();
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }

  getProduit(){
    this.ProduitService.getProduits().subscribe({
      next: data => {
        this.produits = data;
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }

  initialFormGroupe(): void {
    // travaille avec le service ?
    this.form = this.fb.group({
      items: this.fb.array([])
    });    
   
  }

  createItem(consommation: Consommation) {
    return this.fb.group({
      quantite:[consommation ? consommation.quantite : null , [Validators.required]],
      id  : [consommation ? consommation.id : null],
      produit:[consommation ? consommation.produit.id : null , [Validators.required]]
     });
  }

  addItem(item : Consommation|any) {
    const items = this.form.get('items') as FormArray;
    if (!items.invalid) {
      items.push(
        this.createItem(item)
      );
    }
  }

  removeItem(index : number|any) {
    const items = this.form.get('items') as FormArray;
    if(items.controls[index].getRawValue().id){
      this.deleteConsommation(items.controls[index].getRawValue().id);
    }
    items.removeAt(index);
  }

  displayItems() {
    if(this.consommations.length>0){
     this.consommations.forEach((ele :any) => {
       this.addItem(ele);
     });
    }else{
     this.addItem(null);
    }
   }
 
   get itemControls(): any {
     return this.form.get('items') as FormArray;
   }

   onSubmit(): void {
     
    this.form.get('items')?.value.forEach((ele :any) => {
      this.consommation = {
        quantite:ele.quantite,
        produit:{id:ele.produit},
        construction:{id:this.id}
      } 
      if(ele.id){
          //modifier
          this.consommation.id = ele.id;
          this.updateConsommation(this.consommation);
        }else{
          //ajouter
          this.ajouterConsommation(this.consommation)
        }
      
      });
     this.retourn();     
     this.openSnackBar("Enregistrer");
  }

  retourn(){
    this.router.navigateByUrl('mayamcof/admin/consommation/'+this.id);
  }

   ajouterConsommation(consommation:Consommation){
    this.ConsommationService.addConsommation(consommation).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }

  updateConsommation(consommation:Consommation){
    this.ConsommationService.updateConsommation(consommation).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }

  deleteConsommation(id:number){
    this.ConsommationService.deletConsommation(id).subscribe();
  }

  fieldGlobalIndex(index:number) {
   
    return 3 * (this.p - 1) + index;
  }
  
  openSnackBar(name:string) {
    this._snackBar.openFromComponent(EditComponentP, {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
      data: 'la Consommation a éte Bien '+name
    });

  }

  openDialog(id:number) {
    this.dialog.open(SuppressionComponent,{data:{table:"Consommation",name:"la Consommation "+(id+1)}}).afterClosed().subscribe(res =>{
      if(res == "true"){
        this.removeItem(id);
      }
    })
  }

}
