import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-details-route',
  templateUrl: './customer-details-route.component.html',
  styleUrls: ['./customer-details-route.component.css'],
})
export class CustomerDetailsRouteComponent implements OnInit {
  customer?: Customer;
  isDeleteLoading: any[] = [];
  constructor(
    private customerService: CustomerService,
    private activeRoute: ActivatedRoute,
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
        },
        error: () => {
          this.router.navigate(['/not-found']);
        },
      });
  }

  private setIsLoading(customer: Customer, isLoading: boolean) {
    this.isDeleteLoading = this.isDeleteLoading.map((c) => {
      if (c.id === customer.id) {
        return { ...c, isLoading };
      }
      return c;
    });
  }

  delete(customer: Customer) {
    this.setIsLoading(customer, true);
    this.customerService.deleteCustomer(customer).subscribe(() => {
      this.router.navigate(['/']);
      this.setIsLoading(customer, false);
    });
  }
}
