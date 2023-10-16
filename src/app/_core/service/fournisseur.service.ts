import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fournisseur } from '../models/fournisseur';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  headers = new HttpHeaders({
      'Authorization':"Bearer "+this.authService.getAccesToken()
   });
  constructor(private http:HttpClient,private authService:AuthService) { }

  getFournisseurs():Observable<Fournisseur[]>{   
    
    return this.http.get<Fournisseur[]>(environment.apiURL+"/fournisseurs",{headers:this.headers});
  }

  addFournisseur(fournisseur:Fournisseur): Observable<Fournisseur[]>{

    return this.http.post<Fournisseur[]>(environment.apiURL+"/fournisseur",fournisseur,{headers:this.headers});
  }

  getFournisseur(id:number){
    return this.http.get<Fournisseur>(environment.apiURL+"/fournisseur/"+id,{headers:this.headers});
  }

  updateFournisseur(fournisseur:Fournisseur){
    return this.http.put<Fournisseur>(environment.apiURL+"/fournisseur",fournisseur,{headers:this.headers});
  }

  deleteFournisseur(id:number){
      return this.http.delete(environment.apiURL+"/fournisseur/"+id,{headers:this.headers})
  }
}
