import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contrat } from '../models/contrat';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContratService {
  
  headers= new HttpHeaders({
    'Authorization': 'Bearer '+this.authService.getAccesToken()
  });
  constructor(private http:HttpClient,private authService:AuthService) { }
  getContrats() :Observable<Contrat[]>{
    
    return this.http.get<Contrat[]>(environment.apiURL+'/contrats',{headers:this.headers});
  }

  getContrat(id:number):Observable<Contrat>{
    return this.http.get<Contrat>(environment.apiURL+"/contrat/"+id,{headers:this.headers});
  }

  addContrat(contrat:Contrat):Observable<Contrat>{
    return this.http.post<Contrat>(environment.apiURL+"/contrat",contrat,{headers:this.headers});
  }

  updateContrat(contrat:Contrat):Observable<Contrat>{
    return this.http.put<Contrat>(environment.apiURL+"/contrat",contrat,{headers:this.headers});
  }

  deleteContrat(id:number){
    return this.http.delete<Contrat>(environment.apiURL+"/contrat/"+id,{headers:this.headers});
  }
}
