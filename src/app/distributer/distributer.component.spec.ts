import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerComponent } from './distributer.component';

describe('DistributerComponent', () => {
  let component: DistributerComponent;
  let fixture: ComponentFixture<DistributerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
