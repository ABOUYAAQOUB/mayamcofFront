import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tache } from 'src/app/_core/models/tache';
import { TacheService } from 'src/app/_core/service/tache.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form!: FormGroup;
  tache : Tache|any;
  id:number|any ;

  constructor(private tacheService: TacheService,private router:Router,private activeRouter: ActivatedRoute){}
  
  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.paramMap.get('id');
    this.initialFormGroupe();
    if(this.id){
      this.getTache();
    }
  }

  initialFormGroupe(): void {
    this.form = new FormGroup({
      libele: new FormControl(null, [Validators.required,Validators.minLength(3),Validators.pattern("[^0-9].*")])
    });
  }

  onSubmit(): void {
    if(this.id){
      this.update();
    }else{
      this.add()
    }
    
  }

  add(){
    this.tache = {libele:this.form.get('libele')?.value};
    this.tacheService.addTache(this.tache).subscribe({
      next: data => {
        this.router.navigateByUrl('mayamcof/admin/tache');
      },
      error: err => {
        this.form.get('libele')?.setErrors({'exist': true});
      }
    });
  }

  getTache(){
    this.tacheService.getTache(this.id).subscribe(res=>{
       this.form.setValue({
        libele:res.libele
       })
    })
  }

  update(){
    this.tache = {id:this.id,libele:this.form.get('libele')?.value};
    this.tacheService.updateTache(this.tache).subscribe({
      next: data => {
        this.router.navigateByUrl('mayamcof/admin/tache');
      },
      error: err => {
        this.form.get('libele')?.setErrors({'exist': true});
      }
    });
  }

  retourn(){
    this.router.navigateByUrl('mayamcof/admin/tache');
  }

}
