import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from '../models/commande';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  headers = new HttpHeaders({
      'Authorization':"Bearer "+this.authService.getAccesToken()
  });

  constructor(private http:HttpClient,private authService:AuthService) { }

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
