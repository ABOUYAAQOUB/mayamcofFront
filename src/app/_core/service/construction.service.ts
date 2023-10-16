import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Construction } from '../models/construction';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Terrain } from '../models/terrain';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConstructionService {

 headers = new HttpHeaders({
    'Authorization': 'Bearer '+this.authService.getAccesToken()
  });


  constructor(private http: HttpClient,private authService:AuthService) { }

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

  constructionParAnnnee():Observable<String>{
    return this.http.get<String>(environment.apiURL+"/constructionParAnnee",{headers:this.headers});
  }

}
