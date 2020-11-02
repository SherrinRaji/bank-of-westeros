import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomerDetails } from '../Shared/CustomerDetails';
import { CustomerService } from '../services/customer.service';
import { DialogBox,DialogData } from '../Shared/dialog-box';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Country } from '../Shared/CustomerDetails';
import { Route } from '@angular/compiler/src/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  customerDetails: CustomerDetails;
  age: number;
  validAge: boolean;
  accountType = ['Savings','Salary'];
  countryList: Country[];
  states: string[];
  formErrors = {
    'name': '',
    'username': '',
    'password': '',
    'guardianType': '',
    'guardianName': '',
    'address': '',
    'citizenship': '',
    'state': '',
    'country': '',
    'email': '',
    'gender': '',
    'maritalStat': '',
    'contactNo': '',
    'DOB': '',
    'registrationDate': '',
    'accType': '',
    'branchName': '',
    'citizenStat': '',
    'initDepoAmt': '',
    'idProofType': '',
    'idProofNo': '',
    'nomineeName': '',
    'nomineeAccNo': '',
    'nomineeAddress': ''
  };
  validationMessages = {
    'name': {
      'required':'Name is required.',
      'pattern':'Invalid Name.'
    },
    'username': {
      'required':'Username is required.'
    },
    'password': {
      'required':'Password is required.'
    },
    'guardianType': {
      'required':'This is required.'
    },
    'guardianName': {
      'required':'Guardian Name is required.'
    },
    'address': {
      'required':'This is required.'
    },
    'citizenship': {
      'required':'This is required.'
    },
    'state': {
      'required':'This is required.'
    },
    'country': {
      'required':'Country is required.'
    },
    'email': {
      'required':'Email is required.',
      'email':'Invalid email id.'
    },
    'gender': {
      'required':'Gender is required.'
    },
    'maritalStat': {
      'required':'This is required.'
    },
    'contactNo': {
      'required':'This is required.',
      'pattern' :'Invalid contact number.'

    },
    'DOB': {
      'required':'This is required.'

    },
    'registrationDate': {
      'required':'This is required.'

    },
    'accType': {
      'required':'This is required.'

    },
    'branchName': {
      'required':'This is required.'

    },
    'citizenStat': {
      'required':'This is required.'

    },
    'initDepoAmt': {
      'required':'This is required.'

    },
    'idProofType': {
      'required':'This is required.'

    },
    'idProofNo': {
      'required':'This is required.'

    },
    'nomineeName': {
      'required':'This is required.',
      'pattern':'Invalid Name.'

    },
    'nomineeAccNo': {
      'required':'This is required.'

    },
    'nomineeAddress': {
      'required':'This is required.'

    }
  };
  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              public dialog: MatDialog,

              private router: Router) { 
    this.createForm();

  }
  ngOnInit(): void {
    this.customerService.getCountries()
    .subscribe((res)=>{this.countryList = res;
    console.log("countries : " + res);});
  }
  countryChange(count: string): void{
    this.states = this.countryList.find(con=>con.country === count).states;
  }
  accountTypeSelect(value: string){
    if(value==="Savings")
    {
      this.registrationForm.controls.initDepoAmt.setValue(5000);
      this.customerDetails.initDepoAmt = 0;
    }
    if(value==="Salary")
    {
      this.registrationForm.controls.initDepoAmt.setValue(0);
      this.customerDetails.initDepoAmt = 0;
    }
  };
  
  openDialog(dat: DialogData): void{
    const dialog= this.dialog.open(DialogBox,{
      width:'400px',
      data: dat
    })
  }
  createForm(): void{
    this.registrationForm = this.fb.group({
      id: 0,
      name: ['',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
      guardianType: ['',[Validators.required]],
      guardianName: ['',[Validators.required]],
      address: ['',[Validators.required]],
      citizenship: ['',[Validators.required]],
      state: ['',[Validators.required]],
      country: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      gender: ['',[Validators.required]],
      maritalStat: ['',[Validators.required]],
      contactNo: ['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
      DOB: ['',[Validators.required,Validators.max(Date.now())]],
      registrationDate: ['',[Validators.required]],
      accType: ['',[Validators.required]],
      branchName: ['',[Validators.required]],
      citizenStat: [{value:'',disabled:true},[Validators.required]],
      initDepoAmt: ['',[Validators.required]],
      idProofType: ['',[Validators.required]],
      idProofNo: ['',[Validators.required]],
      nomineeName: ['',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      nomineeAccNo: ['',[Validators.required]],
      nomineeAddress: ['',[Validators.required]]
    });
    
    this.registrationForm.valueChanges
      .subscribe(data => {
        this.onValueChanged(data);
      });
    // this.onDobChanged();
    this.onValueChanged();
  }
  onDobChanged(data?: MatDatepickerInputEvent<Date>){
    if(data){
      var timeDiff=Math.abs(Date.now()-new Date(data.value).getTime());
      this.age = Math.floor(timeDiff/(1000*3600*24)/365.25);
      if(this.age<18 || this.age>96){
        this.validAge = false;
      }
      else
      {
        this.validAge=true;
      }
      if(this.age<18)
      {
        this.registrationForm.controls.citizenStat.setValue("Minor");
      }
      else if(this.age>=18 && this.age<=60){
        this.registrationForm.controls.citizenStat.setValue("Normal");
      }
      else if(this.age>60){
        this.registrationForm.controls.citizenStat.setValue("Senior");
      }
    }
  }
  onValueChanged(data?: any) {
    if (!this.registrationForm) { return; }
    var country = this.registrationForm.controls.country.value;
    if(country){
      this.countryChange(country);
    }
    
    const form = this.registrationForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
 
  onSubmit(): void{
    
    var data={page:"registration",id:"",name:"",message:"You have successfully registered! Please login!"};
    this.customerDetails = this.registrationForm.value;
    this.customerDetails.id = "R-"+(""+Math.random()).substring(2,5);
    this.customerDetails.accountNo = (""+Math.random()).substring(2,18);
    this.customerService.saveCustomerDetails(this.customerDetails)
        .subscribe((res)=>{
          data.id=res.id;
          data.name=res.name;
          this.openDialog(data);
        });
    this.router.navigate(["/home"]);

  }
}
