import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masterpage',
  templateUrl: './masterpage.component.html',
  styleUrls: ['./masterpage.component.css']
})

export class MasterpageComponent implements OnInit{

  SidebarOpend = true;

  ngOnInit(): void {
  
  }
  
  sideBartoggle(){
    this.SidebarOpend = !this.SidebarOpend; 
   
  }
}
