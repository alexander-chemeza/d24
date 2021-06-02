import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsButtonsComponent } from './contacts-buttons.component';

describe('ContactsButtonsComponent', () => {
  let component: ContactsButtonsComponent;
  let fixture: ComponentFixture<ContactsButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
