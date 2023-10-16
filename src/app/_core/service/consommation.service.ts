import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consommation } from '../models/consommation';
import { Produit } from '../models/produit';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConsommationService {

  headers = new HttpHeaders({
    'Authorization': 'Bearer '+this.authService.getAccesToken()
  });


  constructor(private http: HttpClient,private authService:AuthService) { }

  getConsommations(): Observable<Consommation[]> {
    return this.http.get<Consommation[]>(environment.apiURL+ "/consommations",{headers:this.headers});
  } 

  getConsommationC(id:number): Observable<Consommation[]> {
    return this.http.get<Consommation[]>(environment.apiURL+ "/consommations/"+id,{headers:this.headers});
  } 


  addConsommation(Consommation:Consommation):Observable<Consommation>{
    return this.http.post<Consommation>(environment.apiURL+"/consommation",Consommation,{headers:this.headers});
  }

  getConsommation(id:number):Observable<Consommation>{
      return this.http.get<Consommation>(environment.apiURL+ "/consommation/"+id,{headers:this.headers});
  }

  updateConsommation(Consommation:Consommation):Observable<Consommation>{
    return this.http.put<Consommation>(environment.apiURL+"/consommation",Consommation,{headers:this.headers});
  }

  deletConsommation(id:number){
    return this.http.delete(environment.apiURL+ "/consommation/"+id,{headers:this.headers});
  }

}
