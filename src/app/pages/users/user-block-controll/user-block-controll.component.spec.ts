import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBlockControllComponent } from './user-block-controll.component';

describe('UserBlockControllComponent', () => {
  let component: UserBlockControllComponent;
  let fixture: ComponentFixture<UserBlockControllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBlockControllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBlockControllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
