import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Consommation } from 'src/app/_core/models/consommation';
import { ConsommationService } from 'src/app/_core/service/consommation.service';
import { SuppressionComponent } from 'src/app/_shear/dialog/suppression/suppression.component';

@Component({
  selector: 'app-consulte',
  templateUrl: './consulte.component.html',
  styleUrls: ['./consulte.component.css']
})
export class ConsulteComponent implements OnInit {

  displayedColumns: string[] = ['id','produit','quantite','action'];
  dataSource = new MatTableDataSource<Consommation>();
  id:number|any;
  idT:number|any;
  @ViewChild(MatPaginator) paginator: MatPaginator|any;
  

  constructor(private ConsommationService:ConsommationService,
              public dialog: MatDialog,
              private router:Router,
              private activeRouter: ActivatedRoute,){}

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.paramMap.get('id');
     this.getConsommations();
  }

  openDialog(id:number) {
    this.dialog.open(SuppressionComponent,{data:{table:"Consommation",name:"la consommation "+id}}).afterClosed().subscribe(res =>{
      if(res == "true"){
        this.deleteConsommation(id);
      }
    })
  }

  deleteConsommation(id:number){
    this.ConsommationService.deletConsommation(id).subscribe();    
    this.dataSource.data = this.dataSource.data.filter(consomation => consomation.id !== id);
  }

  getConsommations(){
    this.ConsommationService.getConsommationC(this.id).subscribe({
      next: data => {
        this.dataSource.data = data;
        this.idT = data[0].construction.terrain.id;
      },
      error: err => {
        console.log(err.error.message)
      }
    })
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

  retourn(){
     this.router.navigateByUrl('mayamcof/admin/construction/'+this.idT);
  }

}
