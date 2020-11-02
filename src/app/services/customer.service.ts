import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { baseURL } from '../Shared/baseURL';
import { CustomerDetails, Country } from '../Shared/CustomerDetails';
import { CurrentCustomer } from '../Shared/CustomerDetails';
import { Loan } from '../Shared/LoanDetails';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  getCountries(): Observable<Country[]>{
    return this.http.get<Country[]>(baseURL+'countries');
  }
  getCustomers(): Observable<CustomerDetails[]>{
    return this.http.get<CustomerDetails[]>(baseURL + 'customerDetails');
  }
  getCustomer(id: string): Observable<CustomerDetails>{
    return this.http.get<CustomerDetails>(baseURL+'customerDetails/' + id);
  }
  getCurrentCustomers(): Observable<CurrentCustomer>{
    return this.http.get<CurrentCustomer>(baseURL + 'currentUser');
  }
  putCustomerDetails(cust: CustomerDetails): Observable<CustomerDetails>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<CustomerDetails>(baseURL + 'customerDetails/'+cust.id, cust, httpOptions);
  }
  saveLoanDetails(loan: Loan): Observable<Loan>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Loan>(baseURL + 'loanDetails',loan,httpOptions);
  }
  saveCustomerDetails(cust: CustomerDetails): Observable<CustomerDetails>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<CustomerDetails>(baseURL + 'customerDetails',cust,httpOptions);
  }
}
