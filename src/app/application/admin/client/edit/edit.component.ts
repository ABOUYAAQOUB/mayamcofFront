import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/_core/models/client';
import { ClientService } from 'src/app/_core/service/client.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  client:Client|any;
  id:number|any;
  constructor(private builder:FormBuilder, private clientService:ClientService, private activeRoute: ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.getClient();
  }

  // registerForm:FormGroup = this.builder.group({
  //   ice:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(4)
  //                               ,Validators.pattern(/^\d+$/)]))
  // });
  

  registerForm:FormGroup = this.builder.group({
    cin:new FormControl('',Validators.compose([Validators.required,Validators.minLength(5)])),
    email: new FormControl('',Validators.compose([Validators.email])),
    nom:new FormControl('',Validators.compose([Validators.required])),
    tel:new FormControl('',Validators.compose([Validators.pattern(/^\d+$/),Validators.minLength(10)])),
  });

  sub(){
      if(this.id!=null){
        this.updateClient();
      }else{
        this.addClient();
      }
    
  }

  addClient(){
    this.client = {
      cin:this.registerForm.get('cin')?.value,
      email:this.registerForm.get('email')?.value,
      nom:this.registerForm.get('nom')?.value,
      tel:this.registerForm.get('tel')?.value
    }
    this.clientService.addClient(this.client).subscribe( {next:data=>{
      this.router.navigateByUrl("mayamcof/admin/client");
    },
    error:err=>{
      this.registerForm.get('cin')?.setErrors({"existe":true});
    }
    });
  }

  getClient(){
    this.clientService.getClient(this.id).subscribe(res=>{
      this.registerForm.setValue({
        cin:res.cin,
        email:res.email,
        nom:res.nom,
        tel:res.tel
      })
    })
  }

  updateClient(){
    this.client = {
      id:this.id,
      cin:this.registerForm.get('cin')?.value,
      email:this.registerForm.get('email')?.value,
      nom:this.registerForm.get('nom')?.value,
      tel:this.registerForm.get('tel')?.value
    }
    this.clientService.updateClient(this.client).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl("mayamcof/admin/client");
    });
  }
}


