import { AfterViewInit, Component, ViewChild,OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Tache } from 'src/app/_core/models/tache';
import { TacheService } from 'src/app/_core/service/tache.service';
import {MatDialog} from '@angular/material/dialog';
import { SuppressionComponent } from 'src/app/_shear/dialog/suppression/suppression.component';





@Component({
  selector: 'app-consulte',
  templateUrl: './consulte.component.html',
  styleUrls: ['./consulte.component.css']
})
export class ConsulteComponent implements AfterViewInit, OnInit{
  
  displayedColumns: string[] = ['id', 'libele','action'];
  dataSource = new MatTableDataSource<Tache>();

  constructor(private tacheService: TacheService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTaches();
  }
  openDialog(name:string,id:number) {
    this.dialog.open(SuppressionComponent,{data:{table:"Tache",name:name}}).afterClosed().subscribe(res =>{
      if(res == "true"){
        this.deletTache(id);
      }
    })
  }

  getTaches(){
    this.tacheService.getTaches().subscribe({
      next: data => {
        this.dataSource.data = data;
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }

  deletTache(id:number){
   this.tacheService.deletTache(id).subscribe();
   this.dataSource.data = this.dataSource.data.filter(tache => tache.id !== id);
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
