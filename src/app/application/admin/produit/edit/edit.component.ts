import { Component } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
//   fournisseurs:Fournisseur|any;
//   produits:Produit|any;
//   checkparam:number|any;
//   detailiCimmande:DetailCommande|any;
//   commande:Commande|any;

//   constructor(private builder:FormBuilder,private serviceProduit:ProduitService,private serviceFournisseur:FournisseurService) {   

//   }

//   ngOnInit(): void {
//     this.getFournisseurs();
//     this.getProduits();
//   }

//   registerForm:FormGroup = this.builder.group({
//       date:new FormControl<Date|null>(null,Validators.compose([Validators.required])),      
//       fournisseur: new FormControl<Fournisseur|null>(null,Validators.compose([Validators.required])),
//       produit:new FormControl<Produit|null>(null,Validators.compose([Validators.required])),
//       prix:new FormControl('',Validators.compose([Validators.required])),
//       quantite:new FormControl('',Validators.compose([Validators.required]))
//     });

//  sub(){
//   if(this.registerForm.valid){

//     this.detailiCimmande={
//       //commande_id:this.commande.id,
//       produit_id:(this.registerForm.get('produit')?.value).id,
//       prix:this.registerForm.get('prix')?.value,
//       quantite:this.registerForm.get('quantite')?.value
//     };

//     this.commande = {
//       datecommande:(this.registerForm.get('date')?.value).toLocaleDateString(),
//       fournisseur_id:(this.registerForm.get('fournisseur')?.value).id,
//     }

//     console.log(this.commande);
//     console.log(this.detailiCimmande);

//   }

//  }

//  getFournisseurs(){
//   this.serviceFournisseur.getFournisseurs().subscribe(res =>{
//     this.fournisseurs = res;
//     console.log(this.fournisseurs);
//   });
//  }

//  getProduits(){
//   this.serviceProduit.getProduits().subscribe(res =>{
//     this.produits = res;
//     console.log(this.produits);
//   });
//  }

}
