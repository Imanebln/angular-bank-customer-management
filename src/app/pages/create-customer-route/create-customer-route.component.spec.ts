import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerRouteComponent } from './create-customer-route.component';

describe('CreateCustomerRouteComponent', () => {
  let component: CreateCustomerRouteComponent;
  let fixture: ComponentFixture<CreateCustomerRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCustomerRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCustomerRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
