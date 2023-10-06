import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Terrain } from 'src/app/_core/models/terrain';
import { TerrainService } from 'src/app/_core/service/terrain.service';
import { SuppressionComponent } from 'src/app/_shear/dialog/suppression/suppression.component';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['id', 'surface','etage', 'adresse','client', "action"];
  dataSource = new MatTableDataSource<Terrain>();
  constructor(private TerrainService:TerrainService, private dialog:MatDialog) {}

  ngOnInit(): void {
    this.getTerrains();
  }

  openDialog(name:string, id:number){
    this.dialog.open(SuppressionComponent, {data:{table:'Terrain', name:name}}).afterClosed().subscribe(res =>{ 
      if(res=='true'){
        this.deleteTerrain(id);
      }
    });
  }

  getTerrains(){
    this.TerrainService.getTerrains().subscribe({
      next:data=>{
        this.dataSource.data=data;
        console.log(data);
      },
      error: err => {
        console.log(err)
      }
    });
  }

  deleteTerrain(id:number){
    this.TerrainService.deleteTerrain(id).subscribe(res=>{
      console.log(this.dataSource.data.filter(Terrain=>Terrain.id!==id))
     this.dataSource.data = this.dataSource.data.filter(Terrain=>Terrain.id!==id)
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
