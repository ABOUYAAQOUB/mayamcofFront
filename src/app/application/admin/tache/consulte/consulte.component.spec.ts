import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulteComponent } from './consulte.component';

describe('ConsulteComponent', () => {
  let component: ConsulteComponent;
  let fixture: ComponentFixture<ConsulteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
