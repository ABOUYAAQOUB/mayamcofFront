import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/_core/models/utilisateur';
import { AuthService } from 'src/app/_core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form:FormGroup|any;
  user:Utilisateur|any;
  constructor(private auth:AuthService,private fb:FormBuilder,private router:Router){}

  ngOnInit(): void {

    this.initialFormGroupe();
  }

  initialFormGroupe(): void {
    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  logincheck(RefreshToken:string,AccessToken:string,username:string){
    this.auth.authentification(RefreshToken,AccessToken,username).subscribe(res=>{
      this.router.navigate(["/mayamcof/admin/dashboard"]);
    });
  }

  sub(){
    this.user = {
      username:this.form.get('username').value,
      password:this.form.get('password').value
    };
    this.auth.auth(this.user).subscribe({
      next:data =>{
        let username:string = this.auth.payload(data['access-token']).sub
        this.logincheck(data['refresh-token'],data['access-token'],username)
     },
    error:err =>{
     if(err.error.message=="Username or password incorrect"){
       this.form.setErrors({'exist':true});
     }
    }});
    console.log(this.user);
  }


}

