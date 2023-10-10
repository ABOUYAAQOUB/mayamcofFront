import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employer } from 'src/app/_core/models/employer';
import { Travailler } from 'src/app/_core/models/travailler';
import { EmployerService } from 'src/app/_core/service/employer.service';
import { TravaillerService } from 'src/app/_core/service/travailler.service';
import { EditComponentP } from 'src/app/_shear/dialog/edit/edit.component';
import { AbstractControl, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  Travailler:Travailler|any;
  employers:Employer[]|any;
  id:number|any;
  idT:number|any;
  constructor(private _snackBar: MatSnackBar,private builder:FormBuilder, private TravaillerService:TravaillerService, private employerService:EmployerService, private activeRoute: ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.idT = this.activeRoute.snapshot.paramMap.get('idT');

    if(this.id){
      this.getTravailler();
    }
    this.employerService.getEmployers().subscribe(res=>{
      console.log(res);
      this.employers = res;
    });
    
  }

  openSnackBar(name:string) {
    this._snackBar.openFromComponent(EditComponentP, {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
      data: 'le Travailler a éte Bien '+name
    });

  }

  // Custom validator function
dateRangeValidator(): boolean {
  const datedebut = this.registerForm.get('datedebut')?.value;
  const datefin = this.registerForm.get('datefin')?.value;

  if (datedebut && datefin && datedebut > datefin) {
    return  true ; // Validation error key
  }

  return false;
}

verifier(){
  if(this.dateRangeValidator()){
    this.registerForm.get('datedebut')?.setErrors({ 'dateRange': true });
    this.registerForm.get('datefin')?.setErrors({ 'dateRange': true });
  }
 //
}

  registerForm:FormGroup = this.builder.group({
    datedebut:new FormControl('',Validators.compose([Validators.required,])),
    datefin:new FormControl('',Validators.compose([Validators.required])),
    employer:new FormControl('',Validators.compose([Validators.required])),
    construction:new FormControl(),
  });

  sub(){
      if(this.id!=null){
        this.updateTravailler();
        this.openSnackBar("Modifier");
      }else{
        this.addTravailler();
        this.openSnackBar("Ajouter");
      }
      
  }

  addTravailler(){
    this.Travailler = {
      datedebut:this.registerForm.get('datedebut')?.value,
      datefin:this.registerForm.get('datefin')?.value,
      employer:{id:this.registerForm.get('employer')?.value},
      construction:{id:this.id}
    }
    console.log(this.Travailler);
    this.TravaillerService.addTravailler(this.Travailler).subscribe( {next:data=>{
      this.router.navigateByUrl("mayamcof/admin/travailler/"+this.id);
    },
    error:err=>{
      
    }
    });
  }

  getTravailler(){
    this.TravaillerService.getTravailler(this.idT).subscribe(res=>{
      this.registerForm.setValue({
        datedebut:new Date(res.datedebut) ,
        datefin:new Date(res.datefin) ,
        employer:res.employer.id,
        construction:res.construction.id
      })
    })
  }

  updateTravailler(){
    this.Travailler = {
      id:this.idT,
      datedebut:this.registerForm.get('datedebut')?.value,
      datefin:this.registerForm.get('datefin')?.value,
      employer:{id:this.registerForm.get('employer')?.value},
      construction:{id:this.id}
    }
    this.TravaillerService.updateTravailler(this.Travailler).subscribe(
      {next:data=>{
        this.router.navigateByUrl("mayamcof/admin/travailler/"+this.id);
      },
      error:err=>{
        
      }
      }
    );
  }
}
