import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Produit } from 'src/app/_core/models/produit';
import { ProduitService } from 'src/app/_core/service/produit.service';
import { SuppressionComponent } from 'src/app/_shear/dialog/suppression/suppression.component';

@Component({
  selector: 'app-consulte',
  templateUrl: './consulte.component.html',
  styleUrls: ['./consulte.component.css']
})
export class ConsulteComponent {

   
  displayedColumns: string[] = ['id', 'nom','action'];
  dataSource = new MatTableDataSource<Produit>();

  constructor(private serviceProduit: ProduitService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProduits();
  }
  openDialog(name:string,id:number) {
    this.dialog.open(SuppressionComponent,{data:{table:"Produit",name:name}}).afterClosed().subscribe(res =>{
      if(res == "true"){
        this.delete(id);
      }
    })
  }

  getProduits(){
    this.serviceProduit.getProduits().subscribe(
      {
        next: data => {
          this.dataSource.data = data;
        },
        error: err => {
          console.log(err.error.message)
        }
      }
    );


  }

  delete(id:number){
    this.serviceProduit.deleteProduit(id).subscribe(res =>{
      this.dataSource.data = this.dataSource.data.filter(produit=>produit.id!==id);
    });
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
}
