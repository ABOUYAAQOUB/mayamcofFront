import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  apiURL = 'http://localhost:8081/';
  token= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzbWFpbCIsInJvbGVzIjpbImFkbWluIl0sImlzcyI6Ii9tYXlhbWNvZi9sb2dpbiIsImV4cCI6MTY5NTU1NDIwOH0.EKkzzE0qoR7DfkHhhR1FizniTuz8eULbAOIKO25D1iE';
  headers= new HttpHeaders({
    'Authorization': 'Bearer '+this.token
  });
  constructor(private http:HttpClient) { }
  getClients() :Observable<Client[]>{
    
    return this.http.get<Client[]>(this.apiURL+'mayamcof/clients',{headers:this.headers});
  }

  getClient(id:number){
    return this.http.get<Client>(this.apiURL+"mayamcof/client/"+id,{headers:this.headers});
  }

  addClient(client:any){
    return this.http.post<Client>(this.apiURL+"mayamcof/client",client,{headers:this.headers});
  }

  updateClient(client:Client){
    return this.http.put<Client>(this.apiURL+"mayamcof/client",client,{headers:this.headers});
  }

  deleteClient(id:number){
    return this.http.delete<Client>(this.apiURL+"mayamcof/client/"+id,{headers:this.headers});
  }

}
