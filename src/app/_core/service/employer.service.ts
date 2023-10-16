import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employer } from '../models/employer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  headers= new HttpHeaders({
    'Authorization': 'Bearer '+this.authService.getAccesToken()
  });
  constructor(private http:HttpClient,private authService:AuthService) { }

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
