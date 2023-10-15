import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../models/utilisateur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers= new HttpHeaders({
    'Content-Type': "application/x-www-form-urlencoded"
  });

  constructor(private httpClient:HttpClient) { }

  auth(user:Utilisateur):Observable<any>{
    return this.httpClient.post<any>(environment.apiURL+"/login",{username:user.username,password:user.password},{headers:this.headers});
  }

}
