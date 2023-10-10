import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Travailler } from '../models/travailler';

@Injectable({
  providedIn: 'root'
})
export class TravaillerService {
  token= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzbWFpbCIsInJvbGVzIjpbImFkbWluIl0sImlzcyI6Ii9tYXlhbWNvZi9sb2dpbiIsImV4cCI6MTY5NjYwOTg4N30.ZNTDCLKI78MvZwxm86nwB7YwPrdb09rJ6AEh2koea-c';
  headers= new HttpHeaders({
    'Authorization': 'Bearer '+environment.Token
  });
  constructor(private http:HttpClient) { }

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