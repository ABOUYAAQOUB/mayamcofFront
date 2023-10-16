import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tache } from '../models/tache';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  headers = new HttpHeaders({
    'Authorization': 'Bearer '+this.authService.getAccesToken()
  });

  constructor(private http: HttpClient,private authService:AuthService) { }

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
