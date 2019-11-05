import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';

import { PopoverModule } from 'ngx-bootstrap/popover';
import { MainComponent } from './main/main.component';
import { DatePipe } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http);
}

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      FormComponent,
      MainComponent,
      FooterComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      PopoverModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      TranslateModule.forRoot({
         loader: {
             provide: TranslateLoader,
             useFactory: HttpLoaderFactory,
             deps: [HttpClient]
         }
     })
   ],
   providers: [
      DatePipe,
      Title
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
