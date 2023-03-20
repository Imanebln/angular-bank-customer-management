import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../../models/Customer';
@Component({
  selector: 'app-customer-list-route',
  templateUrl: './customer-list-route.component.html',
  styleUrls: ['./customer-list-route.component.css'],
})
export class CustomerListRouteComponent implements OnInit {
  customers: Customer[] = [];
  isDeleteLoading: any[] = [];
  searchQuerySubject = new Subject<string>();

  constructor(private customerService: CustomerService) {
    this.searchQuerySubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query: string) => {
        this.search(query);
      });
  }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  search(query: string) {
    this.customerService.search(query).subscribe(
      (customers) => {
        this.customers = customers;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onQuery(event: any) {
    this.searchQuerySubject.next(event.target.value);
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
      this.customers = this.customers.filter((p) => p.id !== customer.id);
      this.setIsLoading(customer, false);
    });
  }

  getIsDeleteLoading(customer: Customer) {
    return this.isDeleteLoading.find((p) => p.id === customer.id)?.isLoading;
  }
}
