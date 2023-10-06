import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employer } from 'src/app/_core/models/employer';
import { EmployerService } from 'src/app/_core/service/employer.service';
import { EditComponentP } from 'src/app/_shear/dialog/edit/edit.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  Employer:Employer|any;
  id:number|any;
  constructor(private _snackBar: MatSnackBar,private builder:FormBuilder, private EmployerService:EmployerService, private activeRoute: ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    if(this.id){
      this.getEmployer();
    }
   
  }

  
  
  openSnackBar(name:string) {
    this._snackBar.openFromComponent(EditComponentP, {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
      data: 'le Employer a éte Bien '+name
    });

  }


  

  registerForm:FormGroup = this.builder.group({
    nom:new FormControl('',Validators.compose([Validators.required])),
    salaire:new FormControl('',Validators.compose([Validators.pattern(/^\d+$/)])),
    type:new FormControl()
  });

  sub(){
      if(this.id!=null){
        this.updateEmployer();
        this.openSnackBar("Modifier");
      }else{
        this.addEmployer();
        this.openSnackBar("Ajouter");
      }
      
  }

  addEmployer(){
    this.Employer = {
      nom:this.registerForm.get('nom')?.value,
      salaire:this.registerForm.get('salaire')?.value,
      type:this.registerForm.get('type')?.value,
    }
    this.EmployerService.addEmployer(this.Employer).subscribe( {next:data=>{
      this.router.navigateByUrl("mayamcof/admin/employer");
    },
    error:err=>{
      
    }
    });
  }

  getEmployer(){
    this.EmployerService.getEmployer(this.id).subscribe(res=>{
      this.registerForm.setValue({
        nom:res.nom,
        salaire:res.salaire,
        type:res.type,
      })
    })
  }

  updateEmployer(){
    this.Employer = {
      id:this.id,
      nom:this.registerForm.get('nom')?.value,
      salaire:this.registerForm.get('salaire')?.value,
      type:this.registerForm.get('type')?.value,
    }
    this.EmployerService.updateEmployer(this.Employer).subscribe(
      {next:data=>{
        this.router.navigateByUrl("mayamcof/admin/employer");
      },
      error:err=>{
        
      }
      }
    );
  }
}
