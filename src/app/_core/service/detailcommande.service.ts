import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailCommande } from '../models/detail-commande';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DetailcommandeService {

  headers = new HttpHeaders({
      'Authorization':"Bearer "+this.authService.getAccesToken()
   });

  constructor(private http:HttpClient,private authService:AuthService) { }

  getDetailCommandes():Observable<DetailCommande[]>{
    return this.http.get<DetailCommande[]>(environment.apiURL+"/detailCommandes",{headers:this.headers});
  }

  getDetailCommandesByCommande(id:number):Observable<DetailCommande[]>{
    return this.http.get<DetailCommande[]>(environment.apiURL+"/detailCommandes/"+id,{headers:this.headers});
  }

  getDetailCommande(id:number):Observable<DetailCommande>{
    return this.http.get<DetailCommande>(environment.apiURL+"/detailCommande/"+id,{headers:this.headers});
  }

  addDetailCommande(detailCommande:DetailCommande):Observable<DetailCommande>{
    return this.http.post<DetailCommande>(environment.apiURL+"/detailCommande",detailCommande,{headers:this.headers});
  }

  updateDetailCommande(detailCommande:DetailCommande):Observable<DetailCommande>{
    return this.http.put<DetailCommande>(environment.apiURL+"/detailCommande",detailCommande,{headers:this.headers});
  }

  deleteDetailCommande(id:number){
    return this.http.delete(environment.apiURL+"/detailCommande/"+id,{headers:this.headers});
  }
}
