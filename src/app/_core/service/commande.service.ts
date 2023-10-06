import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from '../models/commande';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYW16YSIsInJvbGVzIjpbInVzZXIiXSwiaXNzIjoiL21heWFtY29mL2xvZ2luIiwiZXhwIjoxNjk2MzYzMTc0fQ.MP3MrHq8GRRrG37KhorvgV7jULZ6sL0CAd9fkdpqD3M";
  headers = new HttpHeaders({
      'Authorization':"Bearer "+environment.Token
  });

  constructor(private http:HttpClient) { }

  getCommandes():Observable<Commande[]>{
    return this.http.get<Commande[]>(environment.apiURL+"/commandes",{headers:this.headers});
  }

  getCommande(id:number):Observable<Commande>{
    return this.http.get<Commande>(environment.apiURL+"/commande/"+id,{headers:this.headers});
  }

  addCommande(commande:Commande):Observable<Commande>{
    return this.http.post<Commande>(environment.apiURL+"/commande",commande,{headers:this.headers});
  }

  updateCommande(commande:Commande):Observable<Commande>{
    return this.http.put<Commande>(environment.apiURL+"/commande",commande,{headers:this.headers});
  }

  deleteCommande(id:number){
    return this.http.delete(environment.apiURL+"/commande/"+id,{headers:this.headers});
  }

}
