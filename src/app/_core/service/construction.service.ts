import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Construction } from '../models/construction';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Terrain } from '../models/terrain';

@Injectable({
  providedIn: 'root'
})
export class ConstructionService {

  TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5YXNzaW5lIiwicm9sZXMiOlsidXNlciJdLCJpc3MiOiIvbWF5YW1jb2YvbG9naW4iLCJleHAiOjE2OTYyODMwMjh9.Y17GhUvge8SfXBbm1Rn8JiCIt6Breeu1gasb_FW9gdw'

  headers = new HttpHeaders({
    'Authorization': 'Bearer '+environment.Token
  });


  constructor(private http: HttpClient) { }

  getConstructions(): Observable<Construction[]> {
    return this.http.get<Construction[]>(environment.apiURL+ "/constructions",{headers:this.headers});
  } 

  getConstructionsT(id:number): Observable<Construction[]> {
    return this.http.get<Construction[]>(environment.apiURL+ "/constructions/"+id,{headers:this.headers});
  } 


  addConstructions(constructions:Construction):Observable<Construction>{
    return this.http.post<Construction>(environment.apiURL+"/construction",constructions,{headers:this.headers});
  }

  getConstruction(id:number):Observable<Construction>{
      return this.http.get<Construction>(environment.apiURL+ "/construction/"+id,{headers:this.headers});
  }

  updateConstructions(constructions:Construction):Observable<Construction>{
    return this.http.put<Construction>(environment.apiURL+"/construction",constructions,{headers:this.headers});
  }
  deletConstructions(id:number){
    return this.http.delete(environment.apiURL+ "/construction/"+id,{headers:this.headers});
  }





  getTerrin(): Observable<Terrain[]> {
    return this.http.get<Terrain[]>(environment.apiURL+ "/terrains",{headers:this.headers});
  } 

}
