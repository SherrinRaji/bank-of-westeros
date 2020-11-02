import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData{
    page: string;
    id: string;
    name: string;
    message: string;
}
@Component({
    selector: 'dialog-box',
    templateUrl: 'dialog-box.html',
})
export class DialogBox{
    constructor(
        public dialogRef: MatDialogRef<DialogBox>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ){}
}