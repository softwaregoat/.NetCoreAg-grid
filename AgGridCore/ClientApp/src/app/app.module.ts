import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {HomeComponent} from './home/home.component';
import {CounterComponent} from './counter/counter.component';
import {FetchDataComponent} from './fetch-data/fetch-data.component';
import {AgGridModule} from 'ag-grid-angular';
import {NgxIndexedDBModule, DBConfig} from 'ngx-indexed-db';

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
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([]),
    NgxIndexedDBModule.forRoot(dbConfig),
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'counter', component: CounterComponent},
      {path: 'fetch-data', component: FetchDataComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
