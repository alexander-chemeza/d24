import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContragentButtonsComponent } from './contragent-buttons.component';

describe('ContragentButtonsComponent', () => {
  let component: ContragentButtonsComponent;
  let fixture: ComponentFixture<ContragentButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContragentButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContragentButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
