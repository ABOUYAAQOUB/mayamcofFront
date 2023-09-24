import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Fournisseur } from 'src/app/_core/models/fournisseur';
import { FournisseurService } from 'src/app/_core/service/fournisseur.service';
import { MatDialog } from '@angular/material/dialog';
import { SuppressionComponent } from 'src/app/_shear/dialog/suppression/suppression.component';
@Component({
  selector: 'app-consulte',
  templateUrl: './consulte.component.html',
  styleUrls: ['./consulte.component.css']
})
export class ConsulteComponent implements AfterViewInit, OnInit{
  
  displayedColumns: string[] = ['id', 'ice','nom','tel','action'];
  dataSource = new MatTableDataSource<Fournisseur>();
  
  constructor(private dialog:MatDialog,private router:Router,private serviceFournisseur:FournisseurService){this.getData();}
  openDialog(name:string,id:number){
    this.dialog.open(SuppressionComponent,{data:{table:"Fournisseur",name:name}}).afterClosed().subscribe(res =>{
    
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
    this.serviceFournisseur.getFournisseurs().subscribe(res =>{
      this.dataSource.data = res;
    });
  }

  delete(id:number){
    this.serviceFournisseur.deleteFournisseur(id).subscribe(res =>{
      
      this.dataSource.data = this.dataSource.data.filter(fournisseur=>fournisseur.id!==id)
    });   
    
  }
}
