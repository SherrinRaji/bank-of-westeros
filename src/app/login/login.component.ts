import { Component,Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {RegistrationComponent} from '../registration/registration.component';
import { CustomerDetails, CurrentCustomer } from '../Shared/CustomerDetails';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '', remember: false};
  customers: CustomerDetails[];
  currentCustomer: CurrentCustomer;
  currentCustomerCopy: CurrentCustomer;
  constructor(
              public dialogRef: MatDialogRef<LoginComponent>,
              public dialog: MatDialog,
              private customerService: CustomerService,
              private router: Router,
              @Inject(DOCUMENT) private _document: Document
              ) { 
    }

  ngOnInit(): void {
    this.customerService.getCurrentCustomers()
    .subscribe((curr)=> {this.currentCustomer = curr; this.currentCustomerCopy=curr});
    this.customerService.getCustomers()
    .subscribe((customers)=> this.customers = customers);
    console.log('current customer' + this.currentCustomer);
  }
  openRegForm(): void{
    this.dialog.open(RegistrationComponent, {width:'700px' , height: '700px'});
    this.dialogRef.close();
  }

  public login(): void {
    if(this.user.username && this.user.password) {
      var customer = this.customers.filter(item => item.username == this.user.username && item.password == this.user.password)[0];
        if(customer)
        {
          localStorage.setItem('CurrId',customer.id);
          console.log("localStorage.getItem('CurrId'): "+ localStorage.getItem('CurrId'));
        }
        // let headers = new Headers({ "content-type": "application/json" });
        // let options = new RequestOptions({ headers: headers });
        // this.http.post("http://localhost:3000/login", JSON.stringify(this.input), options)
        //     .map(result => result.json())
        //     .subscribe(result => {
        //         this.router.navigate(["/blogs"], { "queryParams": result });
        //     });
    }
}

onSubmit(){
  this.login();
  this.dialogRef.close();
  this._document.defaultView.location.reload();
}
}
