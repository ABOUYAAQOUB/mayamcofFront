import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../models/utilisateur';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers= new HttpHeaders({
    'Content-Type': "application/x-www-form-urlencoded"
  });

  constructor(private httpClient:HttpClient,private router:Router) { }

  auth(user:Utilisateur):Observable<any>{
    let params = new HttpParams()
    .set("username", user.username.toString())
    .set("password", user.password.toString())
    return this.httpClient.post<any>(environment.apiURL+"/login",params,{headers:this.headers});
  }

  refreshtoken():Observable<any>{
    return this.httpClient.get<any>(environment.apiURL+"/refreshToken",{headers:{"Authorization":"Bearer "+this.getRefreshToken()}});
  }

  authentification(RefreshToken:string,AccessToken:string,username:string):Observable<boolean>{
      localStorage.setItem("refreshtoken",RefreshToken);
      localStorage.setItem("accesstoken",AccessToken);
      localStorage.setItem("username",username);
      return of(true);
    }

  isAuthentification(){
    return localStorage.getItem("accesstoken") != null;
  }

  getAccesToken(){
    return localStorage.getItem("accesstoken");
  }

  getRefreshToken(){
    return localStorage.getItem("refreshtoken");
  }

  getUsername(){
    return localStorage.getItem("username");
  }

  logout():Observable<boolean>{
    localStorage.clear();
    return of(true);
  }

  decode(payload: any): any {
    return JSON.parse(atob(payload));
  }

  payload(token: any): any {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

 

}
