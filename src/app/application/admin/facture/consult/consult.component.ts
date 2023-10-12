import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Construction } from 'src/app/_core/models/construction';
import { Facture } from 'src/app/_core/models/facture';
import { ConstructionService } from 'src/app/_core/service/construction.service';
import { FactureService } from 'src/app/_core/service/facture.service';
import { SuppressionComponent } from 'src/app/_shear/dialog/suppression/suppression.component';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ConsultComponent implements OnInit {
  
  columnsToDisplay: string[] = ['id', 'datefacture','terrain','client'];
  constructions:Construction[]|any = null;
  dataSource = new MatTableDataSource<Facture>();
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Facture | any;
  total:number=0;
  constructor(private factureService: FactureService,private construction:ConstructionService,public dialog: MatDialog) { }
  
  ngOnInit(): void {
   this.getFacture();   
  }

  openDialog(id:number) {
    this.dialog.open(SuppressionComponent,{data:{table:"Facture",name:id}}).afterClosed().subscribe(res =>{
      if(res == "true"){
       this.deletFacture(id);
      }
    })
  }

  getFacture(){
    this.factureService.getFactures().subscribe({
      next: data => {
        this.dataSource.data = data;
        this.getconstruction();
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }

  deletFacture(id:number){
    this.factureService.deleteFacture(id).subscribe();
    this.dataSource.data = this.dataSource.data.filter(facture => facture.id !== id);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator|any;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getFacture();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getconstruction(){
    this.construction.getConstructions().subscribe({
      next: data => {
        this.constructions = data;
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }

  getClient(id:number):string{
    let nom :string = '';
      this.constructions.forEach((element: Construction) => {
      if(element.facture && element.facture.id==id){
        nom = String(element.terrain.client.nom);
        return;
      }
    });
   return nom;
  }

  getTotale(id:number):Number{
    this.constructions.filter((cons:Construction)=>cons.facture!==null && cons.facture.id==id).forEach((element:Construction)=>{
      this.total+=Number(element.prix)*Number(element.quantite);
    })
    return this.total;
  }

  
  getTerrain(id:number):string{
    let adresse :string = '';
    this.constructions.forEach((element: Construction) => {
     if(element.facture && element.facture.id==id){
      adresse = String(element.terrain.adresse);
      return;
     }
   });
   return adresse;
  }

}
