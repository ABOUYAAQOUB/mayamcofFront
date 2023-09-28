import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  apiURL = 'http://localhost:8081/';
  token= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5YXNzaW5lIiwicm9sZXMiOlsidXNlciJdLCJpc3MiOiIvbWF5YW1jb2YvbG9naW4iLCJleHAiOjE2OTU5Mjk1MzF9.6lyYzE0zvz1xZchbyBzZ8p8WmvO3MgsyK42mdzYyvDE';
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
