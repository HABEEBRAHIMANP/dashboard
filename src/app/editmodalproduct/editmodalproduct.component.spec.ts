import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmodalproductComponent } from './editmodalproduct.component';

describe('EditmodalproductComponent', () => {
  let component: EditmodalproductComponent;
  let fixture: ComponentFixture<EditmodalproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmodalproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmodalproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
