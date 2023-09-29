import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tache } from '../models/tache';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5YXNzaW5lIiwicm9sZXMiOlsidXNlciJdLCJpc3MiOiIvbWF5YW1jb2YvbG9naW4iLCJleHAiOjE2OTU5Mjk1MzF9.6lyYzE0zvz1xZchbyBzZ8p8WmvO3MgsyK42mdzYyvDE'

  headers = new HttpHeaders({
    'Authorization': 'Bearer '+this.TOKEN
  });

  constructor(private http: HttpClient) { }

  getTaches(): Observable<Tache[]> {
   
    return this.http.get<Tache[]>(environment.apiURL+ "/taches",{headers:this.headers});
  } 

  addTache(tache:Tache):Observable<Tache>{
   
    return this.http.post<Tache>(environment.apiURL+"/tache",tache,{headers:this.headers});
  }

  getTache(id:number):Observable<Tache>{
      return this.http.get<Tache>(environment.apiURL+ "/tache/"+id,{headers:this.headers});
  }

  updateTache(tache:Tache):Observable<Tache>{
    return this.http.put<Tache>(environment.apiURL+"/tache",tache,{headers:this.headers});
  }
  deletTache(id:number){
    return this.http.delete(environment.apiURL+ "/tache/"+id,{headers:this.headers});
  }
}
