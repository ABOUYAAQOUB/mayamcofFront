import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tache } from '../models/tache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  apiUrl = 'http://localhost:8081/';

  TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5YXNzaW5lIiwicm9sZXMiOlsidXNlciJdLCJpc3MiOiIvbWF5YW1jb2YvbG9naW4iLCJleHAiOjE2OTU0NjMyMTF9.KVuk9NNlTklxMYwi1oud2R2BBOHtmCll4ZjptTNBwwQ'

  headers = new HttpHeaders({
    'Authorization': 'Bearer '+this.TOKEN
  });

  constructor(private http: HttpClient) { }

  getTaches(): Observable<Tache[]> {
   
    return this.http.get<Tache[]>(this.apiUrl + "mayamcof/taches",{headers:this.headers});
  } 

  addTache(tache:Tache):Observable<Tache>{
   
    return this.http.post<Tache>(this.apiUrl+"mayamcof/tache",tache,{headers:this.headers});
  }

  getTache(id:number):Observable<Tache>{
      return this.http.get<Tache>(this.apiUrl + "mayamcof/tache/"+id,{headers:this.headers});
  }

  updateTache(tache:Tache):Observable<Tache>{
    return this.http.put<Tache>(this.apiUrl+"mayamcof/tache",tache,{headers:this.headers});
  }
  deletTache(id:number){
    return this.http.delete(this.apiUrl+ "mayamcof/tache/"+id,{headers:this.headers});
  }
}
