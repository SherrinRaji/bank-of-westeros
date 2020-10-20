import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {RegistrationComponent} from '../registration/registration.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '', remember: false};
  constructor(public dialogRef: MatDialogRef<LoginComponent>,public dialog: MatDialog) { 
    }

  ngOnInit(): void {
  }
  onSubmit(): void{
    console.log('User: ', this.user);
    this.dialogRef.close();
  }
  openRegForm(): void{
    this.dialog.open(RegistrationComponent, {width:'700px' , height: '900px'});
    this.dialogRef.close();
  }
}
