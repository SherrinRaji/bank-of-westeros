export class Loan {
    loanType: string;
    loanAmount: string;
    lApplyDate: string;
    lIssueDate: string;
    rateOfInterest: number;
    duration: number;
};
export class EducationLoan{
    courseFee: number;
    course: string;
    fatherName: string;
    fatherOccupation: string;
    fatherTotalExp: number;
    fatherExpCurr: number;
    rationCardNo: number;
    annualIncome: number;
}
export class PersonalLoan{
    annualIncome: number;
    companyName: string;
    designation: string;
    totalExp: number;
    expCurr: number;
}
export const  LoanTypes = ['Educational', 'Personal'];
export const  LoanDuration = [5,10,15,20];