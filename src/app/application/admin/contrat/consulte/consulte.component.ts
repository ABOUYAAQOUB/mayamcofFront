import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Contrat } from 'src/app/_core/models/contrat';
import { ContratService } from 'src/app/_core/service/contrat.service';
import { SuppressionComponent } from 'src/app/_shear/dialog/suppression/suppression.component';

@Component({
  selector: 'app-consulte',
  templateUrl: './consulte.component.html',
  styleUrls: ['./consulte.component.css']
})
export class ConsulteComponent {

  displayedColumns: string[] = ['id','datecontrat','terrain', 'contratpdf','action'];
  dataSource = new MatTableDataSource<Contrat>();
  contentType:string = "application/png";
  constructor(private dialog:MatDialog,private router:Router,private serviceContart:ContratService){this.getData();}
  openDialog(name:string,id:number){
    this.dialog.open(SuppressionComponent,{data:{table:"Contart",name:name}}).afterClosed().subscribe(res =>{
    
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

  base64toBlob(base64Data: string, contentType: string): Blob {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    return new Blob(byteArrays, { type: contentType });
  }
  exportFile(base64Output:string,contrat:Contrat){
    
      const blob = this.base64toBlob(base64Output, this.contentType);
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = contrat.id+"Contrat"+new Date(contrat.datecontrat)+".png"; // Specify the desired file name with appropriate extension
      document.body.appendChild(a);
      a.click();
  
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData(){
    this.serviceContart.getContrats().subscribe(res =>{
      this.dataSource.data = res;
    });
  }

  delete(id:number){
    this.serviceContart.deleteContrat(id).subscribe(res =>{
      this.dataSource.data = this.dataSource.data.filter(contrat=>contrat.id!==id)
    }); 
    
  }
}
