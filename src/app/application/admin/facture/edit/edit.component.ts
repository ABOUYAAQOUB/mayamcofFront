import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Construction } from 'src/app/_core/models/construction';
import { Facture } from 'src/app/_core/models/facture';
import { Terrain } from 'src/app/_core/models/terrain';
import { ConstructionService } from 'src/app/_core/service/construction.service';
import { FactureService } from 'src/app/_core/service/facture.service';
import { TerrainService } from 'src/app/_core/service/terrain.service';
import { EditComponentP } from 'src/app/_shear/dialog/edit/edit.component';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  facturefrom!: FormGroup;
  terrains:Terrain[]|any;
  displayedColumns: string[] = ['select','tache', 'unite','quantite','prix','PrixTotal'];
  dataSource = new MatTableDataSource<Construction>();
  selection = new SelectionModel<Construction>(true, []);  
  facture:Facture|any=null;
  id:number|any;
  @ViewChild(MatPaginator) paginator: MatPaginator|any;

  constructor(public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private route:Router,
              private routeparam:ActivatedRoute,
              private fb: FormBuilder,
              private factureService:FactureService,
              private terrainService:TerrainService,
              private constructionService:ConstructionService) {}
  
  ngOnInit(): void {
    this.id = this.routeparam.snapshot.paramMap.get('id');
    this.initialFormGroupe();
    if(this.id){
      this.getfacture();
       
    }
    this.getTerrain();
  }

  openSnackBar(name:string) {
    this._snackBar.openFromComponent(EditComponentP, {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
      data: 'la facture a éte Bien '+name
    });

  }

  

  getTerrain(){
    this.terrainService.getTerrains().subscribe({
      next: data => {
        this.terrains = data;
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }

  getfacture(){
    this.factureService.getFacture(this.id).subscribe({
      next: data => {
          this.facturefrom.get('datefacture')?.setValue(new Date(data.datefacture));
          this.facturefrom.get('id')?.setValue(data.id);
          this.getconstruction(Number(data.id));
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }

  initialFormGroupe(): void {
    this.facturefrom = this.fb.group({
      id:[null],
      datefacture:[null,[Validators.required]],
      terrain:[null],
    });    
  }

  addfacture(facture:Facture){
    this.factureService.addFacture(facture).subscribe({
      next: data => {
        this.getselected(data);
      },
      error: err => {
         console.log(err.error.message);
      }
    });
  }


  udatefacture(facture:Facture){
    this.factureService.updateFacture(facture).subscribe({
      next: data => {
        this.getselected(data);
      },
      error: err => {
         console.log(err.error.message)
      
      }
    });
  }

  getconstruction(id:number){
    this.constructionService.getConstructions().subscribe({
      next: data => {
        let construction = data.filter((construction:Construction)=>construction.facture!=null && construction.facture.id==id);
        this.facturefrom.get('terrain')?.setValue(construction[0].terrain.id);
        this.facturefrom.get('terrain')?.disable();
        this.facturefrom.get('datefacture')?.disable();
        this.getConstructions(Number(construction[0].terrain.id));
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }



  getConstructions(id:number){
    this.constructionService.getConstructionsT(id).subscribe({
      next: data => {
        this.dataSource.data = data.filter((construction:Construction)=>construction.facture==null || construction.facture.id==this.id);
        this.cheked();
       // this.total = this.dataSource.data.reduce((acc, produit) => acc +  (Number(produit.prix)* Number(produit.quantite)), 0);
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }



  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Construction): string {
    
    if (!row) {
    //  console.log(`${this.isAllSelected() ? 'deselect' : 'select'} all`);
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
  //  console.log(`${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`);
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }


  onSubmit(): void{
    this.facture = {
      datefacture:this.facturefrom.get('datefacture')?.value
    }
     if(this.facturefrom.get('id')?.value){
      this.facture.id=this.facturefrom.get('id')?.value;
      this.udatefacture(this.facture);
      this.openSnackBar("Modifier");
     }else{
      this.addfacture(this.facture);
      this.openSnackBar("Ajouter");
     }
     this.retourn();
     
  }

  updateConstruction(construction:Construction){
    this.constructionService.updateConstructions(construction).subscribe({
      next: data => {
        data;
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }

 
  getselected(facture:Facture){
    
   
    this.dataSource.data.forEach((ele:Construction|any)=>{
     
      if(this.selection.isSelected(ele)){
        ele.facture = facture;
         
      }else{
        ele.facture = null;
      }
      this.updateConstruction(ele);
    })
  }

  cheked(){
    this.dataSource.data.forEach((ele:Construction|any)=>{
      if(ele.facture){
        this.selection.toggle(ele);
      }
    })
  }

  retourn(){
    this.route.navigateByUrl('mayamcof/admin/facture');
  }


}
