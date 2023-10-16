import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Client } from 'src/app/_core/models/client';
import { AuthService } from 'src/app/_core/service/auth.service';
import { ClientService } from 'src/app/_core/service/client.service';
import { SuppressionComponent } from 'src/app/_shear/dialog/suppression/suppression.component';


@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['id', 'cin','email', 'nom', 'tel','action'];
  dataSource = new MatTableDataSource<Client>();
  constructor(private clientService:ClientService, private router: Router, private dialog:MatDialog,private auth:AuthService) {}

  ngOnInit(): void {
    this.getClients();
  }

  openDialog(name:string, id:number){
    this.dialog.open(SuppressionComponent, {data:{table:'Client', name:name}}).afterClosed().subscribe(res =>{ 
      if(res=='true'){
        this.deleteClient(id);
      }
    });
  }

  getClients(){
    this.clientService.getClients().subscribe({
      next:data=>{
        this.dataSource.data=data;
       // console.log(data);
      },
      error: err => {
        this.verifier(err.error.message);
        this.getClients();
      }
    });
  }

  verifier(msg:string){
    if(msg=="Token inccorecte"){
      this.auth.logout();
      this.router.navigate(["mayamcof/login"]);
    }else{
      this.auth.refreshtoken().subscribe({
        next:data=>{
          localStorage.clear();
          let username:string = this.auth.payload(data['access-token']).sub
          this.auth.authentification(data['refresh-token'],data['access-token'],username)
          console.log(this.auth.getAccesToken());
        },
        error:err=>{
          this.auth.logout();
          this.router.navigate(["mayamcof/login"]);
        }
      })      
    }   
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
