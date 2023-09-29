import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fournisseur } from '../models/fournisseur';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5YXNzaW5lIiwicm9sZXMiOlsidXNlciJdLCJpc3MiOiIvbWF5YW1jb2YvbG9naW4iLCJleHAiOjE2OTU5Mjk1MzF9.6lyYzE0zvz1xZchbyBzZ8p8WmvO3MgsyK42mdzYyvDE";
  headers = new HttpHeaders({
      'Authorization':"Bearer "+this.token
   });
  constructor(private http:HttpClient) { }

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
