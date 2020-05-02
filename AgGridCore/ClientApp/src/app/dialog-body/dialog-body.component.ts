import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxIndexedDBService} from 'ngx-indexed-db';

export interface DialogData {
  collper: string;
  psuix: string;
  segid: string;
  scheD_OWNER_ID: string;
  lineid: any;
  version: any;
  fielD_COLLECTION_STATUS: string;
  fG_NON_MONTHLY: string;
  ofO_EA_ID: string;
  utapt: string;
  utcity: string;
  utsena: string;
  utseno: string;
  utstate: string;
  utzip: string;
  linetype: any;
  occname: string;
  inttype: string;
}

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent {
  firstFormGroup: FormGroup;
  public prefferred_name: string;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    private dbService: NgxIndexedDBService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      collper: [this.data.collper, Validators.required],
      psuix: [this.data.psuix, Validators.required],
      segid: [this.data.segid, Validators.required],
      status: ['', Validators.required],
      preferred_name: [this.prefferred_name, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  nextStep(): void {
    this.prefferred_name = this.firstFormGroup.get('preferred_name').value;
  }

  doneSteps(): void {
    this.dbService.add('userResponses', this.firstFormGroup.value).then(
      () => {
        console.log('saved result', this.firstFormGroup.value);
      },
      error => {
        console.log(error);
      }
    );
    this.dialogRef.close();
  }
}
