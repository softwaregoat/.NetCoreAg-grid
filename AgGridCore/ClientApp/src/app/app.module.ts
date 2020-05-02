import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { MatDialogModule} from '@angular/material/dialog';
import {AppComponent} from './app.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {HomeComponent} from './home/home.component';
import {CounterComponent} from './counter/counter.component';
import {FetchDataComponent} from './fetch-data/fetch-data.component';
import {AgGridModule} from 'ag-grid-angular';
import {NgxIndexedDBModule, DBConfig} from 'ngx-indexed-db';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule } from '@angular/forms';
const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'SampleDB',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'collper', keypath: 'collper', options: { unique: false } },
      { name: 'psuix', keypath: 'psuix', options: { unique: false } },
      { name: 'segid', keypath: 'segid', options: { unique: false } },
      { name: 'scheD_OWNER_ID', keypath: 'scheD_OWNER_ID', options: { unique: false } },
      { name: 'lineid', keypath: 'lineid', options: { unique: false } },
      { name: 'version', keypath: 'version', options: { unique: false } },
      { name: 'fielD_COLLECTION_STATUS', keypath: 'fielD_COLLECTION_STATUS', options: { unique: false } },
      { name: 'fG_NON_MONTHLY', keypath: 'fG_NON_MONTHLY', options: { unique: false } },
      { name: 'ofO_EA_ID', keypath: 'ofO_EA_ID', options: { unique: false } },
      { name: 'utapt', keypath: 'utapt', options: { unique: false } },
      { name: 'utcity', keypath: 'utcity', options: { unique: false } },
      { name: 'utsena', keypath: 'utsena', options: { unique: false } },
      { name: 'utseno', keypath: 'utseno', options: { unique: false } },
      { name: 'utstate', keypath: 'utstate', options: { unique: false } },
      { name: 'utzip', keypath: 'utzip', options: { unique: false } },
      { name: 'linetype', keypath: 'linetype', options: { unique: false } },
      { name: 'occname', keypath: 'occname', options: { unique: false } },
      { name: 'inttype', keypath: 'inttype', options: { unique: false } }
    ]
  },
    {
    store: 'userResponses',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'collper', keypath: 'collper', options: { unique: false } },
      { name: 'psuix', keypath: 'psuix', options: { unique: false } },
      { name: 'segid', keypath: 'segid', options: { unique: false } },
      { name: 'status', keypath: 'status', options: { unique: false } },
      { name: 'preferred_name', keypath: 'preferred_name', options: { unique: false } }
    ]
  }
  ]
};

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    DialogBodyComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatRadioModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule ,
    AgGridModule.withComponents([]),
    NgxIndexedDBModule.forRoot(dbConfig),
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'counter', component: CounterComponent},
      {path: 'fetch-data', component: FetchDataComponent},
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogBodyComponent],
})
export class AppModule {
}
