import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainuiComponent } from './mainui.component';

describe('MainuiComponent', () => {
  let component: MainuiComponent;
  let fixture: ComponentFixture<MainuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
