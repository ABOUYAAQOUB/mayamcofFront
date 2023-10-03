import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYW16YSIsInJvbGVzIjpbInVzZXIiXSwiaXNzIjoiL21heWFtY29mL2xvZ2luIiwiZXhwIjoxNjk2MzYzMTc0fQ.MP3MrHq8GRRrG37KhorvgV7jULZ6sL0CAd9fkdpqD3M";
  headers = new HttpHeaders({
      'Authorization':"Bearer "+this.token
   });
  constructor(private http:HttpClient) { }

  getProduits():Observable<Produit[]>{
    return this.http.get<Produit[]>(environment.apiURL+"/produits",{headers:this.headers});
  }
}
