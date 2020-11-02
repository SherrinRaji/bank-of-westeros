import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerDetails,CurrentCustomer } from '../Shared/CustomerDetails';
import { CustomerService } from '../services/customer.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  currentCustomer: CurrentCustomer;
  customerDetails: CustomerDetails;
  cursid;
  updateForm: FormGroup;
  isEdit: boolean = false;
  formErrors = {
    'name': '',
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
      'required':'This is required.'

    },
    'nomineeAccNo': {
      'required':'This is required.'

    },
    'nomineeAddress': {
      'required':'This is required.'

    }
  };
  constructor(private customerService: CustomerService,
              private router: Router,
              private fb: FormBuilder) {
                this.createForm();
              }
              
  ngOnInit(): void {
        this.cursid = localStorage.getItem('CurrId');
        this.customerService.getCustomer(this.cursid)
        .subscribe((details)=>{this.customerDetails = details;
        console.log(details);});
        console.log("customer Details : "+this.customerDetails);
        
  }
  createForm(): void{
    this.updateForm = this.fb.group({
      id: 0,
      name: ['',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
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
      DOB: ['',[Validators.required]],
      registrationDate: ['',[Validators.required]],
      accType: ['',[Validators.required]],
      branchName: ['',[Validators.required]],
      citizenStat: ['',[Validators.required]],
      idProofType: ['',[Validators.required]],
      idProofNo: ['',[Validators.required]],
      nomineeName: ['',[Validators.required]],
      nomineeAccNo: ['',[Validators.required]],
      nomineeAddress: ['',[Validators.required]]
    });
  }
  onSubmit(): void{

  }
  onEdit(): void{
    this.isEdit = true;
  }
  onCancel(): void{
    this.isEdit = false;
  }
}
