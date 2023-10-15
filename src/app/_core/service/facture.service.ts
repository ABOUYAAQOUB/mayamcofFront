import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Facture } from '../models/facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  headers= new HttpHeaders({
    'Authorization': 'Bearer '+environment.Token
  });
  constructor(private http:HttpClient) { }

  getFactures() :Observable<Facture[]>{
    
    return this.http.get<Facture[]>(environment.apiURL+'/factures',{headers:this.headers});
  }
  getFacture(id:number){
    return this.http.get<Facture>(environment.apiURL+"/facture/"+id,{headers:this.headers});
  }

  addFacture(facture:Facture){
    return this.http.post<Facture>(environment.apiURL+"/facture",facture,{headers:this.headers});
  }

  updateFacture(facture:Facture){
    return this.http.put<Facture>(environment.apiURL+"/facture",facture,{headers:this.headers});
  }

  deleteFacture(id:number){
    return this.http.delete<Facture>(environment.apiURL+"/facture/"+id,{headers:this.headers});
  }
}
