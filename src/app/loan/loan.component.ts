import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Loan,LoanTypes,LoanDuration } from '../Shared/LoanDetails';
import { NumericValidator } from '../Shared/CustomValidators';
import { CustomerService } from '../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox,DialogData } from '../Shared/dialog-box';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              public dialog: MatDialog,
              private router: Router) { 
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
  openDialog(dat: DialogData): void{
    const dialog= this.dialog.open(DialogBox,{
      width:'400px',
      data: dat
    })
  }
  onSubmit(): void {
    var data={page:"loan",id:"",name:"",message:"Loan Details have been saved successfully"};

    this.loanDetails.cusId = localStorage.getItem('CurrId');
    this.loanDetails.loanType = this.loanForm.get('loanType').value;
    this.loanDetails.loanAmount = this.loanForm.get('loanAmount').value;
    this.loanDetails.lApplyDate = this.loanForm.get('lApplyDate').value;
    this.loanDetails.lIssueDate = this.loanForm.get('lIssueDate').value;
    this.loanDetails.rateOfInterest = this.loanForm.get('rateOfInterest').value;
    this.loanDetails.duration = this.loanForm.get('duration').value;
    this.loanDetails.eduLoan.annualIncome = this.loanForm.get('annualIncome').value;
    this.loanDetails.eduLoan.course = this.loanForm.get('course').value;
    this.loanDetails.eduLoan.courseFee = this.loanForm.get('courseFee').value;
    this.loanDetails.eduLoan.fatherExpCurr = this.loanForm.get('fatherExpCurr').value;
    this.loanDetails.eduLoan.fatherName = this.loanForm.get('fatherName').value;
    this.loanDetails.eduLoan.fatherOccupation = this.loanForm.get('fatherOccupation').value;
    this.loanDetails.eduLoan.fatherTotalExp = this.loanForm.get('fatherTotalExp').value;
    this.loanDetails.eduLoan.rationCardNo = this.loanForm.get('rationCardNo').value;
    this.loanDetails.persLoan.annualIncome = this.loanForm.get('annualIncome').value;
    this.loanDetails.persLoan.companyName = this.loanForm.get('companyName').value;
    this.loanDetails.persLoan.designation = this.loanForm.get('designation').value;
    this.loanDetails.persLoan.expCurr = this.loanForm.get('expCurr').value;
    this.loanDetails.persLoan.totalExp = this.loanForm.get('totalExp').value;

    this.customerService.saveLoanDetails(this.loanDetails)
        .subscribe((res)=>{
          data.id=res.cusId;
          data.name="";
          this.openDialog(data);
        });
    this.loanForm.reset();
    this.router.navigate(["/home"]);
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
  }
}
