import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {RegistrationComponent} from '../registration/registration.component';
import { CustomerService } from '../services/customer.service';
import { CustomerDetails, CurrentCustomer } from '../Shared/CustomerDetails';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  customers: CustomerDetails[];
  currentCustomer: CurrentCustomer;
  currId;
  loggedIn: boolean = false;
  constructor(public dialog: MatDialog,
              private customerService: CustomerService,
              private router: Router) { }

  ngOnInit(): void {
    this.currId = localStorage.getItem('CurrId');
    if(this.currId!="")
    {
      this.loggedIn = true;
    } 
    this.customerService.getCurrentCustomers()
    .subscribe((curr)=> {
      this.currentCustomer.username = curr.username;
      this.currentCustomer.id = curr.id;
      this.currentCustomer.name = curr.name
    });
    this.customerService.getCustomers()
    .subscribe((customers)=> {
      this.customers = customers;
    });
  }
  openRegForm(): void{
    this.dialog.open(RegistrationComponent, {width:'700px' , height: '900px'})
  }
}
