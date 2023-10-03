import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Construction } from 'src/app/_core/models/construction';
import { ConstructionService } from 'src/app/_core/service/construction.service';
import { SuppressionComponent } from 'src/app/_shear/dialog/suppression/suppression.component';



@Component({
  selector: 'app-consulte',
  templateUrl: './consulte.component.html',
  styleUrls: ['./consulte.component.css'],
 
})
export class ConsulteComponent implements OnInit{

  displayedColumns: string[] = ['id','tache', 'unite','quantite','prix','PrixTotal','action'];
  dataSource = new MatTableDataSource<Construction>();
  total:number|any;
  id:number|any;
  @ViewChild(MatPaginator) paginator: MatPaginator|any;
  

  constructor(private constructionService:ConstructionService,
              public dialog: MatDialog,
              private activeRouter: ActivatedRoute,){}
  
  ngOnInit(): void {
    
    this.id = this.activeRouter.snapshot.paramMap.get('id');
    this.getConstructions();
  }

  openDialog(id:number) {
    this.dialog.open(SuppressionComponent,{data:{table:"Constructions",name:"la construction "+id}}).afterClosed().subscribe(res =>{
      if(res == "true"){
        this.deleteConstruction(id);
      }
    })
  }

  getConstructions(){
    this.constructionService.getConstructionsT(this.id).subscribe({
      next: data => {
        this.dataSource.data = data;
        this.total = this.dataSource.data.reduce((acc, produit) => acc +  (Number(produit.prix)* Number(produit.quantite)), 0);
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }

  deleteConstruction(id:number){
    this.constructionService.deletConstructions(id).subscribe();    
    this.dataSource.data = this.dataSource.data.filter(construction => construction.id !== id);
  }

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
