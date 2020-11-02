import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenu } from '@angular/material/menu';
import { LoginComponent } from '../login/login.component';
import { CustomerService } from '../services/customer.service';
import { CustomerDetails, CurrentCustomer } from '../Shared/CustomerDetails';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentCustomer: CustomerDetails;
  loggedIn: boolean = false;
  selectProfile: string;
  profileOptions: string[] = ['View Profile','Logout'];
  currId;
  constructor(public dialog: MatDialog,
              private customerService: CustomerService,
              private router: Router) { }

  ngOnInit(): void {
    this.currId = localStorage.getItem('CurrId');
    if(this.currId!="")
    {
      this.loggedIn = true;
    }  
    this.customerService.getCustomer(this.currId)
        .subscribe((curr)=> this.currentCustomer = curr);
  }
  onProfileSelect(event: any): void{
    if(event.toElement.innerText==="Logout"){
      this.loggedIn = false;
      localStorage.setItem('CurrId',"");
      
          this.router.navigate(["/home"]);
  }
  else if(event.toElement.innerText==="View Profile"){
    this.router.navigate(["/viewprofile"]);

  }
};
  openLoginForm(): void{
    this.dialog.open(LoginComponent, {width: '500px' , height: '450px'})
  }
  
}
