import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';

import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      FormComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      PopoverModule.forRoot(),
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
