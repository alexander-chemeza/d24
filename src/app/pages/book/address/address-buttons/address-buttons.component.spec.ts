import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressButtonsComponent } from './address-buttons.component';

describe('AddressButtonsComponent', () => {
  let component: AddressButtonsComponent;
  let fixture: ComponentFixture<AddressButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
