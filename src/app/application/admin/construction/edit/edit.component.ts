import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Construction } from 'src/app/_core/models/construction';
import { Tache } from 'src/app/_core/models/tache';
import { Terrain } from 'src/app/_core/models/terrain';
import { ConstructionService } from 'src/app/_core/service/construction.service';
import { TacheService } from 'src/app/_core/service/tache.service';




@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  
 
  form!:FormGroup;
  id:number|any ;
  taches:Tache[]|any;
  constructions:Construction[]|any;
  construction:Construction|any;



  constructor(private _snackBar: MatSnackBar,
    private tacheService:TacheService,
    private constructionService: ConstructionService,
    private router:Router,
    private activeRouter: ActivatedRoute,
    private fb : FormBuilder){}
  


  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.paramMap.get('id');
    this.initialFormGroupe();
    this.getConstructions();
    this.getTaches();
  }

  getConstructions(){
    this.constructionService.getConstructionsT(this.id).subscribe({
      next: data => {
        this.constructions = data;
        this.displayItems();
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }


  initialFormGroupe(): void {
    // travaille avec le service ?
    this.form = this.fb.group({
      items: this.fb.array([])
    });    
   
  }

  createItem(construction: Construction) {
    return this.fb.group({
      unite  : [construction ? construction.unite : null , [Validators.required,Validators.minLength(2)]],
      quantite:[construction ? construction.quantite : null , [Validators.required]],
      id  : [construction ? construction.id : null],
      tache:[construction ? construction.tache.id : null , [Validators.required]],
      prix  : [construction ? construction.prix : null , [Validators.required]],
     });
  }

  addItem(item : Construction|any) {
    const items = this.form.get('items') as FormArray;
    if (!items.invalid) {
      items.push(
        this.createItem(item)
      );
    }
  }

  removeItem(index : number|any) {
    const items = this.form.get('items') as FormArray;
    if(items.controls[index].getRawValue().id){
      this.deleteCoonstruction(items.controls[index].getRawValue().id);
    }
    items.removeAt(index);
    
  }

  displayItems() {
   if(this.constructions.length>0){
    this.constructions.forEach((ele :any) => {
      this.addItem(ele);
    });
   }else{
    this.addItem(null);
   }
    
   
  }

  get itemControls(): any {
    return this.form.get('items') as FormArray;
  }
 
  

 

  getTaches(){
    this.tacheService.getTaches().subscribe({
      next: data => {
        this.taches = data;
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }

 

  onSubmit(): void {
     
    this.form.get('items')?.value.forEach((ele :any) => {
      this.construction = {
        unite  : ele.unite,
        quantite:ele.quantite,
        tache:{id:ele.tache},
        prix : ele.prix,
        terrain:{id:1}
      } 
      if(ele.id){
          //modifier
          this.construction.id = ele.id;
          this.updateConstruction(this.construction);
        }else{
          //ajouter
          this.ajouterConstruction(this.construction)
        }
      
      });
     this.retourn();
  }

  retourn(){
    this.router.navigateByUrl('mayamcof/admin/construction/'+this.id);
  }

  ajouterConstruction(construction:Construction){
    this.constructionService.addConstructions(construction).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }

  updateConstruction(construction:Construction){
    this.constructionService.updateConstructions(construction).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }
  
  deleteCoonstruction(id:number){
    this.constructionService.deletConstructions(id).subscribe();
  }
 
}
