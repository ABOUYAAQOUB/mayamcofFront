import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Employer } from 'src/app/_core/models/employer';
import { EmployerService } from 'src/app/_core/service/employer.service';
import { SuppressionComponent } from 'src/app/_shear/dialog/suppression/suppression.component';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['id', 'nom','salaire', 'type', 'action'];
  dataSource = new MatTableDataSource<Employer>();
  constructor(private employerService:EmployerService, private dialog:MatDialog) {}

  ngOnInit(): void {
    this.getEmployers();
  }

  openDialog(name:string, id:number){
    this.dialog.open(SuppressionComponent, {data:{table:'Employer', name:name}}).afterClosed().subscribe(res =>{ 
      if(res=='true'){
        this.deleteEmployer(id);
      }
    });
  }

  getEmployers(){
    this.employerService.getEmployers().subscribe({
      next:data=>{
        this.dataSource.data=data;
        console.log(data);
      },
      error: err => {
        console.log(err)
      }
    });
  }

  deleteEmployer(id:number){
    this.employerService.deleteEmployer(id).subscribe(res=>{
      console.log(this.dataSource.data.filter(Employer=>Employer.id!==id))
     this.dataSource.data = this.dataSource.data.filter(Employer=>Employer.id!==id)
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
