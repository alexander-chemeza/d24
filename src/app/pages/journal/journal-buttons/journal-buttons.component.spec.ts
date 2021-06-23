import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalButtonsComponent } from './journal-buttons.component';

describe('JournalButtonsComponent', () => {
  let component: JournalButtonsComponent;
  let fixture: ComponentFixture<JournalButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
