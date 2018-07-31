import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ZetwerkMaterialModule } from './material.module';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgileService } from './agile.service';


import { AppComponent } from './app.component';
import { AddEmpDialogComponent } from './dialog/AddEmpDialog';

import { APP_ROUTES } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,

    AddEmpDialogComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ZetwerkMaterialModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES, {useHash: false}),
    RouterModule.forChild(APP_ROUTES),
  ],

  exports: [
    RouterModule
  ],

  providers: [AgileService],

  entryComponents: [
    AddEmpDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
