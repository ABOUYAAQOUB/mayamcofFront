import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

 
  
  constructor(private http:HttpClient,private authService:AuthService) { }
  getClients() :Observable<Client[]>{
    return this.http.get<Client[]>(environment.apiURL+'/clients',{headers:this.setheader()});

  }

  getClient(id:number){
    return this.http.get<Client>(environment.apiURL+"/client/"+id,{headers:this.setheader()});
  }

  addClient(client:any){
    return this.http.post<Client>(environment.apiURL+"/client",client,{headers:this.setheader()});
  }

  updateClient(client:Client){
    return this.http.put<Client>(environment.apiURL+"/client",client,{headers:this.setheader()});
  }

  deleteClient(id:number){
    return this.http.delete<Client>(environment.apiURL+"/client/"+id,{headers:this.setheader()});
  }

  setheader():HttpHeaders{
    return new HttpHeaders({
      'Authorization': 'Bearer '+this.authService.getAccesToken()
    });
  }

}
