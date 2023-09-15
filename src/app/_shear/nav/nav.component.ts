import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Output() toggelSidebarForMe : EventEmitter<any> = new EventEmitter();
  x=5;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  toggelSideBar(){
    this.toggelSidebarForMe.emit(this.x);
  }
}
