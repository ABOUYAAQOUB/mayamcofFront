import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fournisseur } from '../models/fournisseur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  apiUrl = "http://localhost:8081/mayamcof/";
  token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5YXNzaW5lIiwicm9sZXMiOlsidXNlciJdLCJpc3MiOiIvbWF5YW1jb2YvbG9naW4iLCJleHAiOjE2OTU5Mjk1MzF9.6lyYzE0zvz1xZchbyBzZ8p8WmvO3MgsyK42mdzYyvDE";
  headers = new HttpHeaders({
      'Authorization':"Bearer "+this.token
   });
  constructor(private http:HttpClient) { }

  getFournisseurs():Observable<Fournisseur[]>{   
    
    return this.http.get<Fournisseur[]>(this.apiUrl+"fournisseurs",{headers:this.headers});
  }

  addFournisseur(fournisseur:Fournisseur): Observable<Fournisseur[]>{

    return this.http.post<Fournisseur[]>(this.apiUrl+"fournisseur",fournisseur,{headers:this.headers});
  }

  getFournisseur(id:number){
    return this.http.get<Fournisseur>(this.apiUrl+"fournisseur/"+id,{headers:this.headers});
  }

  updateFournisseur(fournisseur:Fournisseur){
    return this.http.put<Fournisseur>(this.apiUrl+"fournisseur",fournisseur,{headers:this.headers});
  }

  deleteFournisseur(id:number){
      return this.http.delete(this.apiUrl+"fournisseur/"+id,{headers:this.headers})
  }
}
