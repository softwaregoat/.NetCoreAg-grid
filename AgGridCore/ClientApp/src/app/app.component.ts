import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AgGridAngular} from 'ag-grid-angular';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import * as XLSX from 'xlsx';
import {SwUpdate} from '@angular/service-worker';
import { DialogBodyComponent} from './dialog-body/dialog-body.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('agGrid', {read: true, static: false}) agGrid: AgGridAngular;
  showing: boolean;
  private gridApi;
  private gridColumnApi;
  private params;
  selectedRow: DBController;
  network: boolean;
  username: string;
  title = 'app';
  columnDefs = [
    {headerName: 'collper', field: 'collper', sortable: true, filter: true, checkboxSelection: true},
    {headerName: 'psuix', field: 'psuix', sortable: true, filter: true},
    {headerName: 'segid', field: 'segid', sortable: true, filter: true},
    {headerName: 'scheD_OWNER_ID', field: 'scheD_OWNER_ID', sortable: true, filter: true},
    {headerName: 'lineid', field: 'lineid', sortable: true, filter: true},
    {headerName: 'version', field: 'version', sortable: true, filter: true},
    {headerName: 'fielD_COLLECTION_STATUS', field: 'fielD_COLLECTION_STATUS', sortable: true, filter: true},
    {headerName: 'fG_NON_MONTHLY', field: 'fG_NON_MONTHLY', sortable: true, filter: true},
    {headerName: 'ofO_EA_ID', field: 'ofO_EA_ID', sortable: true, filter: true},
    {headerName: 'utapt', field: 'utapt', sortable: true, filter: true},
    {headerName: 'utcity', field: 'utcity', sortable: true, filter: true},
    {headerName: 'utsena', field: 'utsena', sortable: true, filter: true},
    {headerName: 'utseno', field: 'utseno', sortable: true, filter: true},
    {headerName: 'utstate', field: 'utstate', sortable: true, filter: true},
    {headerName: 'utzip', field: 'utzip', sortable: true, filter: true},
    {headerName: 'linetype', field: 'linetype', sortable: true, filter: true},
    {headerName: 'occname', field: 'occname', sortable: true, filter: true},
    {headerName: 'inttype', field: 'inttype', sortable: true, filter: true}
  ];
  rowData: any;
  constructor(public dialog: MatDialog, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private dbService: NgxIndexedDBService, updates: SwUpdate) {
    this.http.get(this.baseUrl + 'username').subscribe(result => {
      this.username = result[0];
    });
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
    });

  }

  ngOnInit() {

    this.http.get<DBController[]>(this.baseUrl + 'sampledata').subscribe(result => {
      this.dbService.clear('SampleDB');
      for (let row of result) {
        this.dbService.add('SampleDB', row).then(
          () => {
          },
          error => {
            console.log(error);
          }
        );
      }

    }, error => console.error(error));
    this.network = window.navigator.onLine;
    this.dbService.getAll('SampleDB').then(
      rowData => {
        if (rowData.length > 0) {
          this.rowData = rowData;
          console.log(rowData);
        } else {
          console.log('SampleDB is not ready');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onGridReady(params) {
    this.params = params;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFilterTextBoxChanged(event: any) {
    this.gridApi.setQuickFilter(event.target.value);
  }

  onExportDataAsCSV() {
    this.gridApi.exportDataAsCsv(this.params);
  }

  onFileChange(ev) {
    let workBook = null;
     let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, {type: 'binary'});
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        this.rowData = XLSX.utils.sheet_to_json(sheet);
        this.dbService.clear('SampleDB');
        for (let row of this.rowData) {
          this.dbService.add('SampleDB', row).then(
            () => {
            },
            error => {
              console.log(error);
            }
          );
        }
        return initial;
      }, {});
    };
    reader.readAsBinaryString(file);
  }
  selectRow(): void {
    this.showing = true;
  }
  onSelectionChanged(): void {
    this.showing = true;
  }
  openDialog(): void {
    if (this.dialog.openDialogs.length > 0)
    {
      return;
    }
    let selectedNodes = null;
    let selectedData = null;
    selectedNodes = this.gridApi.getSelectedNodes();
    selectedData = selectedNodes.map( function(node) { return node.data; });
    this.selectedRow = selectedData;
    console.log('selectedRow', this.selectedRow );
    // collper = selectedData.map( function(node) { return node.collper; });
    // psuix = selectedData.map( function(node) { return node.psuix; });
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      // width: '250px',
      data: this.selectedRow[0],
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.showing = false;
    });
  }
}

interface DBController {
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
