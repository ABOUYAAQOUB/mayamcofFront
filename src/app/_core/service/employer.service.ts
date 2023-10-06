import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employer } from '../models/employer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  token= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzbWFpbCIsInJvbGVzIjpbImFkbWluIl0sImlzcyI6Ii9tYXlhbWNvZi9sb2dpbiIsImV4cCI6MTY5NjUzNzYyMn0.FbMz9gvaQZm1rMlIrX2rEej3MBIXJk98vnb2pcNOqMM';
  headers= new HttpHeaders({
    'Authorization': 'Bearer '+this.token
  });
  constructor(private http:HttpClient) { }

  getEmployers() :Observable<Employer[]>{
    
    return this.http.get<Employer[]>(environment.apiURL+'/employers',{headers:this.headers});
  }

  getEmployer(id:number){
    return this.http.get<Employer>(environment.apiURL+"/employer/"+id,{headers:this.headers});
  }

  addEmployer(employer:any){
    return this.http.post<Employer>(environment.apiURL+"/employer",employer,{headers:this.headers});
  }

  updateEmployer(employer:Employer){
    return this.http.put<Employer>(environment.apiURL+"/employer",employer,{headers:this.headers});
  }

  deleteEmployer(id:number){
    return this.http.delete<Employer>(environment.apiURL+"/employer/"+id,{headers:this.headers});
  }
}
