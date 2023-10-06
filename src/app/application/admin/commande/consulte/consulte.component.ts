import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { connect } from 'rxjs';
import { Commande } from 'src/app/_core/models/commande';
import { DetailCommande } from 'src/app/_core/models/detail-commande';
import { Fournisseur } from 'src/app/_core/models/fournisseur';
import { Produit } from 'src/app/_core/models/produit';
import { CommandeService } from 'src/app/_core/service/commande.service';
import { DetailcommandeService } from 'src/app/_core/service/detailcommande.service';
import { FournisseurService } from 'src/app/_core/service/fournisseur.service';
import { ProduitService } from 'src/app/_core/service/produit.service';
import { SuppressionComponent } from 'src/app/_shear/dialog/suppression/suppression.component';


@Component({
  selector: 'app-consulte',
  templateUrl: './consulte.component.html',
  styleUrls: ['./consulte.component.css']
})
export class ConsulteComponent implements AfterViewInit, OnInit{

  displayedColumns: string[] = ['id', 'datecommande','fournisseur','action'];
  dataSource = new MatTableDataSource<Commande>();
  
  constructor(private dialog:MatDialog,private router:Router,private serviceCommande:CommandeService){this.getData();}
  openDialog(name:string,id:number){
    this.dialog.open(SuppressionComponent,{data:{table:"Commande",name:name}}).afterClosed().subscribe(res =>{
    
      if(res == "true"){
        this.delete(id);
      }

    });

  }

  ngOnInit(): void {
      this.getData();
  }
  

  @ViewChild(MatPaginator) paginator: MatPaginator|any;
  ngAfterViewInit(): void {
    
    this.dataSource.paginator = this.paginator;
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData(){
    
    this.serviceCommande.getCommandes().subscribe(res =>{
      this.dataSource.data = res;
    });
  }

  delete(id:number){
    this.serviceCommande.deleteCommande(id).subscribe(res =>{
      this.dataSource.data = this.dataSource.data.filter(commande=>commande.id!==id)
    });
  }

}
