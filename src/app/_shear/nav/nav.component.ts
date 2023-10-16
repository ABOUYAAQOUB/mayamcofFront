import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_core/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Output() toggelSidebarForMe : EventEmitter<any> = new EventEmitter();
  Username:string|any;
  constructor(private auth:AuthService,private router:Router){}

  ngOnInit(): void {
    this.Username = this.auth.getUsername();
  }

  toggelSideBar(){
    this.toggelSidebarForMe.emit();
  }

  logout(){
    this.auth.logout();
    this.router.navigate(["/mayamcof/login"])
  }
}
