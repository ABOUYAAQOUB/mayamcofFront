import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Terrain } from '../models/terrain';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {
  token= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzbWFpbCIsInJvbGVzIjpbImFkbWluIl0sImlzcyI6Ii9tYXlhbWNvZi9sb2dpbiIsImV4cCI6MTY5NjYwOTg4N30.ZNTDCLKI78MvZwxm86nwB7YwPrdb09rJ6AEh2koea-c';
  headers= new HttpHeaders({
    'Authorization': 'Bearer '+this.token
  });
  constructor(private http:HttpClient) { }

  getTerrains() :Observable<Terrain[]>{
    
    return this.http.get<Terrain[]>(environment.apiURL+'/terrains',{headers:this.headers});
  }

  getTerrain(id:number){
    return this.http.get<Terrain>(environment.apiURL+"/terrain/"+id,{headers:this.headers});
  }

  addTerrain(Terrain:any){
    return this.http.post<Terrain>(environment.apiURL+"/terrain",Terrain,{headers:this.headers});
  }

  updateTerrain(Terrain:Terrain){
    return this.http.put<Terrain>(environment.apiURL+"/terrain",Terrain,{headers:this.headers});
  }

  deleteTerrain(id:number){
    return this.http.delete<Terrain>(environment.apiURL+"/terrain/"+id,{headers:this.headers});
  }
}
