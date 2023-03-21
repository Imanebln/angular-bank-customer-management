import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  customerForm!: FormGroup;
  isLoading = false;
  customer?: Customer;

  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(
        switchMap((params) =>
          this.customerService.getCustomerById(params['id'])
        )
      )
      .subscribe({
        next: (customer) => {
          this.customer = customer;

          // Initialize form controls with customer values
          this.customerForm = this.formBuilder.group({
            firstName: [
              this.customer.firstName,
              [Validators.required, Validators.minLength(3)],
            ],
            lastName: [
              this.customer.lastName,
              [Validators.required, Validators.minLength(3)],
            ],
            email: [
              this.customer.email,
              [Validators.required, Validators.email],
            ],
            phone: [
              this.customer.phone,
              [Validators.required, Validators.minLength(10)],
            ],
            address: [
              this.customer.address,
              [Validators.required, Validators.minLength(10)],
            ],
            amount: [
              this.customer.amount,
              [Validators.required, Validators.min(500)],
            ],
            gender: [this.customer.gender, [Validators.required]],
            accountType: [this.customer.accountType, [Validators.required]],
          });
        },
        error: () => {
          this.router.navigate(['/not-found']);
        },
      });
  }

  edit() {
    this.isLoading = true;
    const updatedCustomer = {
      id: this.customer?.id,
      accountNumber: this.customer?.accountNumber,
      ...this.customerForm.value,
    };

    this.customerService
      .updateCustomer(updatedCustomer)
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
}
