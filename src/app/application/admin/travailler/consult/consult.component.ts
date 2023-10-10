import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Travailler } from 'src/app/_core/models/travailler';
import { TravaillerService } from 'src/app/_core/service/travailler.service';
import { SuppressionComponent } from 'src/app/_shear/dialog/suppression/suppression.component';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements AfterViewInit, OnInit{
  id:number|any;
  displayedColumns: string[] = ['id', 'datedebut','datefin', 'construction','employer', "action"];
  dataSource = new MatTableDataSource<Travailler>();
  constructor(private TravaillerService:TravaillerService, private dialog:MatDialog, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.getTravaillers();
  }

  openDialog(name:string, id:number){
    this.dialog.open(SuppressionComponent, {data:{table:'Travailler', name:name}}).afterClosed().subscribe(res =>{ 
      if(res=='true'){
        this.deleteTravailler(id);
      }
    });
  }

  getTravaillers(){
    this.TravaillerService.getTravaillers(this.id).subscribe({
      next:data=>{
        this.dataSource.data=data;
        console.log(data);
      },
      error: err => {
        console.log(err)
      }
    });
  }

  deleteTravailler(id:number){
    this.TravaillerService.deleteTravailler(id).subscribe(res=>{
      console.log(this.dataSource.data.filter(Travailler=>Travailler.id!==id))
     this.dataSource.data = this.dataSource.data.filter(Travailler=>Travailler.id!==id)
    })
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
