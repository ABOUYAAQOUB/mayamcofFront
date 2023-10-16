import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Terrain } from '../models/terrain';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {
  headers= new HttpHeaders({
    'Authorization': 'Bearer '+this.authService.getAccesToken()
  });
  constructor(private http:HttpClient,private authService:AuthService) { }

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

  getTerrainWithAnyContrat():Observable<Terrain[]>{
      return this.http.get<Terrain[]>(environment.apiURL+"/terrainsAnyContrat",{headers:this.headers});
  }

  getTerrainUpdate(id:number){
    return this.http.get<Terrain[]>(environment.apiURL+"/getTerrainUpdate/"+id,{headers:this.headers})
  }

  // select t.* from terrains t where t.id not in (select t.id from terrains t, contrats c where c.id!=1 and t.id = c.terrain_id );
}
