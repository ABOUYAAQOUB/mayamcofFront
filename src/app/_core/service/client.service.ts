import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  token= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5YXNzaW5lIiwicm9sZXMiOlsidXNlciJdLCJpc3MiOiIvbWF5YW1jb2YvbG9naW4iLCJleHAiOjE2OTU5ODM2NDl9.38WC9NBkXMb8rFwLZhUTW1HURf2qdfPd2yz1z_XeO34';
  headers= new HttpHeaders({
    'Authorization': 'Bearer '+environment.Token
  });
  constructor(private http:HttpClient) { }
  getClients() :Observable<Client[]>{
    
    return this.http.get<Client[]>(environment.apiURL+'/clients',{headers:this.headers});
  }

  getClient(id:number){
    return this.http.get<Client>(environment.apiURL+"/client/"+id,{headers:this.headers});
  }

  addClient(client:any){
    return this.http.post<Client>(environment.apiURL+"/client",client,{headers:this.headers});
  }

  updateClient(client:Client){
    return this.http.put<Client>(environment.apiURL+"/client",client,{headers:this.headers});
  }

  deleteClient(id:number){
    return this.http.delete<Client>(environment.apiURL+"/client/"+id,{headers:this.headers});
  }

}
