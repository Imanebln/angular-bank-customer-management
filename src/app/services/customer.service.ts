import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Customer } from '../models/Customer';
import { CustomerForm } from '../models/CustomerForm.model';

const API_URL = 'http://localhost:3000/customers';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(API_URL);
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${API_URL}/${id}`);
  }

  getCustomerByName(name: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_URL}?name=${name}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(API_URL, customer);
  }

  search(name: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_URL}?q=${name}`);
  }

  updateCustomer(customer: any): Observable<Customer> {
    return this.http.put<Customer>(`${API_URL}/${customer.id}`, customer);
  }

  deleteCustomer(customer: Customer) {
    return this.http.delete(`${API_URL}/${customer.id}`);
  }
}
