import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/_core/models/client';
import { ClientService } from 'src/app/_core/service/client.service';


@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['id', 'cin','email', 'nom', 'tel','action'];
  dataSource = new MatTableDataSource<Client>();
  constructor(private clientService:ClientService, private activeRoute: ActivatedRoute, private dialog:MatDialog) {}

  ngOnInit(): void {
    this.getClients();
    // this.id = this.activeRoute.snapshot.paramMap.get('id');
    // this.deleteClient();
  }

  openDialog(name:string, id:number){
    this.dialog.open('', {data:{table:'Client', name:name}}).afterClosed().subscribe(res =>{ 
      if(res=='true'){
        this.deleteClient(id);
      }
    });
  }

  getClients(){
    this.clientService.getClients().subscribe({
      next:data=>{
        this.dataSource.data=data;
        console.log(data);
      },
      error: err => {
        console.log(err)
      }
    });
  }

  deleteClient(id:number){
    this.clientService.deleteClient(id).subscribe(res=>{
      console.log(this.dataSource.data.filter(client=>client.id!==id))
     this.dataSource.data = this.dataSource.data.filter(client=>client.id!==id)
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
