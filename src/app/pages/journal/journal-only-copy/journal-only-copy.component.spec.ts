import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalOnlyCopyComponent } from './journal-only-copy.component';

describe('JournalOnlyCopyComponent', () => {
  let component: JournalOnlyCopyComponent;
  let fixture: ComponentFixture<JournalOnlyCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalOnlyCopyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalOnlyCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
