import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  customers?: Customer[];
  totalAmount$?: string;
  constructor(private customerService: CustomerService) {}
  ngOnInit() {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
      let totalAmount = customers?.reduce(
        (sum, customer) => sum + customer.amount,
        0
      );
      this.totalAmount$ =
        (totalAmount / 1000000).toLocaleString('en-US', {
          maximumFractionDigits: 1,
          minimumFractionDigits: 0,
        }) + 'M';
    });
  }
}
