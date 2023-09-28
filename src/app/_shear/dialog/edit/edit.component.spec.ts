import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponentP } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponentP;
  let fixture: ComponentFixture<EditComponentP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComponentP ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComponentP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
