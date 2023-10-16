import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Travailler } from '../models/travailler';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TravaillerService {
  headers= new HttpHeaders({
    'Authorization': 'Bearer '+this.authService.getAccesToken()
  })
  constructor(private http:HttpClient,private authService:AuthService) { }

  getTravaillers(id:number) :Observable<Travailler[]>{
    
    return this.http.get<Travailler[]>(environment.apiURL+'/travaillers/'+id,{headers:this.headers});
  }

  getTravailler(id:number){
    return this.http.get<Travailler>(environment.apiURL+"/travailler/"+id,{headers:this.headers});
  }

  addTravailler(Travailler:any){
    return this.http.post<Travailler>(environment.apiURL+"/travailler",Travailler,{headers:this.headers});
  }

  updateTravailler(Travailler:Travailler){
    return this.http.put<Travailler>(environment.apiURL+"/travailler",Travailler,{headers:this.headers});
  }

  deleteTravailler(id:number){
    return this.http.delete<Travailler>(environment.apiURL+"/travailler/"+id,{headers:this.headers});
  }
}