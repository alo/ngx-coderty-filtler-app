import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { NgxCodertyFilterModule } from '../../projects/ngx-coderty-filter/src/public_api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgxCodertyFilterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
