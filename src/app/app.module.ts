import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterpageComponent } from './shear/masterpage/masterpage.component';
import { CoreModule } from './_core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    MasterpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
