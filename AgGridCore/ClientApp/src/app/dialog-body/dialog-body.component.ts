import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {HttpClient} from '@angular/common/http';

export interface DialogData {
  collper: string;
  psuix: string;
  segid: string;
  status: string;
  preferred_name: string;
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
    private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
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
    this.data.preferred_name = this.prefferred_name;
    this.data.status = this.firstFormGroup.get('status').value;
  }
  doneSteps(): void {
    if (window.navigator.onLine) {
      this.http.post(this.baseUrl + 'api/userresponse', this.firstFormGroup.value).subscribe(result => {
        console.log('Post result', result);
      });
    }
    else {
      this.dbService.add('userResponses', this.firstFormGroup.value).then(
        () => {
          console.log('saved result', this.firstFormGroup.value);
        },
        error => {
          console.log(error);
        }
      );
    }

    this.dialogRef.close();
  }
}
