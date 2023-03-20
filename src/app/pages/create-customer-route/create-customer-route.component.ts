import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/customer.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-customer-route',
  templateUrl: './create-customer-route.component.html',
  styleUrls: ['./create-customer-route.component.css'],
})
export class CreateCustomerRouteComponent {
  customerForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.customerForm = this.formBuilder.group({
      accountNumber: [this.generateAccountNumber()],
      id: uuid.v4(),
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      amount: [0, [Validators.required, Validators.min(500)]],
      gender: ['', [Validators.required]],
      accountType: ['', [Validators.required]],
    });
  }

  generateAccountNumber() {
    let accountNumber = '';
    for (let i = 0; i < 3; i++) {
      accountNumber += Math.floor(Math.random() * 9000) + 1000;
      if (i !== 2) {
        accountNumber += ' ';
      }
    }
    return accountNumber;
  }

  submit() {
    this.isLoading = true;
    this.customerService
      .createCustomer(this.customerForm.value)
      .subscribe((customer: Customer) => {
        this.isLoading = false;
        this.customerForm.reset();
        this.router.navigate(['/details', customer.id]);
      });
  }

  getControl(controlName: string) {
    return this.customerForm.get(controlName);
  }

  canSubmit(): boolean {
    return this.customerForm.dirty && this.customerForm.valid;
  }

  validateName(
    control: AbstractControl
  ): Observable<{ nameExists: boolean } | null> {
    return this.customerService.getCustomerByName(control.value).pipe(
      map((customers: Customer[]) => {
        if (customers.length > 0) {
          return { nameExists: true };
        }
        return null;
      })
    );
  }
}
