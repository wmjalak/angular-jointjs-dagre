import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ModelerModule } from './modeler/modeler.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ModelerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
