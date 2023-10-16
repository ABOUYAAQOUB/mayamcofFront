import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  headers = new HttpHeaders({
      'Authorization':"Bearer "+this.authService.getAccesToken()
   });
  constructor(private http:HttpClient,private authService:AuthService) { }

  getProduits():Observable<Produit[]>{
    return this.http.get<Produit[]>(environment.apiURL+"/produits",{headers:this.headers});
  }

  getProduit(id:number):Observable<Produit>{
    return this.http.get<Produit>(environment.apiURL+"/produit/"+id,{headers:this.headers})
  }

  addProduit(produit:Produit):Observable<Produit[]>{
    return this.http.post<Produit[]>(environment.apiURL+"/produit",produit,{headers:this.headers});
  }

  updateProduit(produit:Produit):Observable<Produit[]>{
    return this.http.put<Produit[]>(environment.apiURL+"/produit",produit,{headers:this.headers})
  }

  deleteProduit(id:number){
    return this.http.delete(environment.apiURL+"/produit/"+id,{headers:this.headers});
  }
}
