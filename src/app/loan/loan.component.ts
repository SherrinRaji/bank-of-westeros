import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Loan,LoanTypes,LoanDuration } from '../Shared/LoanDetails';
import { NumericValidator } from '../Shared/CustomValidators'
@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  loanForm: FormGroup;
  loanDetails: Loan;
  loanTypes = LoanTypes;
  loanDuration = LoanDuration;
  isPersonal: boolean = false;
  isEducational: boolean = false;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
  }
  createForm(): void {
    this.loanForm = new FormGroup({
      loanType: new FormControl('',[ Validators.required]),
      loanAmount: new FormControl('',[ Validators.required,NumericValidator]),
      lApplyDate: new FormControl('',[ Validators.required ]),
      lIssueDate: new FormControl('',[ Validators.required ]),
      rateOfInterest: new FormControl('',[ Validators.required ]),
      duration: new FormControl('',[ Validators.required ]),
      courseFee: new FormControl('',[ Validators.required ]),
      course: new FormControl('',[ Validators.required ]),
      fatherName: new FormControl('',[ Validators.required ]),
      fatherOccupation: new FormControl('',[ Validators.required ]),
      fatherTotalExp: new FormControl('',[ Validators.required ]),
      fatherExpCurr: new FormControl('',[ Validators.required ]),
      rationCardNo: new FormControl('',[ Validators.required ]),
      annualIncome: new FormControl('',[ Validators.required ]),
      companyName: new FormControl('',[ Validators.required ]),
      designation: new FormControl('',[ Validators.required ]),
      totalExp: new FormControl('',[ Validators.required ]),
      expCurr: new FormControl('',[ Validators.required ])
    });
  }
  onSubmit(): void {
    this.loanDetails.loanType = this.loanForm.get('loanType').value;
    this.loanDetails.loanAmount = this.loanForm.get('loanAmount').value;
    this.loanDetails.lApplyDate = this.loanForm.get('lApplyDate').value;
    this.loanDetails.lIssueDate = this.loanForm.get('lIssueDate').value;
    this.loanDetails.rateOfInterest = this.loanForm.get('rateOfInterest').value;
    this.loanDetails.duration = this.loanForm.get('duration').value;

    console.log(this.loanDetails);
    this.loanForm.reset();
  }
  loanTypeSelect(loanType: string): void{
    if(loanType === 'Personal'){
      this.isPersonal = true;
      this.isEducational = false;

    }
    if(loanType === 'Educational'){
      this.isPersonal = false;
      this.isEducational = true;
    }
    console.log(this.isPersonal +''+ this.isEducational);
  }
}
