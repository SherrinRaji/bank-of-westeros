import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomerDetails } from '../Shared/CustomerDetails';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  customerDetails: CustomerDetails;
 
  constructor(private fb: FormBuilder) { 
    this.createForm();
  }
  ngOnInit(): void {
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
      DOB: ['',[Validators.required]],
      registrationDate: ['',[Validators.required]],
      accType: ['',[Validators.required]],
      branchName: ['',[Validators.required]],
      citizenStat: ['',[Validators.required]],
      initDepoAmt: ['',[Validators.required]],
      idProofType: ['',[Validators.required]],
      idProofNo: ['',[Validators.required]],
      nomineeName: ['',[Validators.required]],
      nomineeAccNo: ['',[Validators.required]],
      nomineeAddress: ['',[Validators.required]]
    })
  }
  onSubmit(): void{
    this.customerDetails = this.registrationForm.value;
    console.log(this.customerDetails);
    this.registrationForm.reset();
  }
}
