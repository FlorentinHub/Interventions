import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { AccueilComponent } from './accueil/accueil.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LongueurMinimumComponent } from './shared/longueur-minimum/longueur-minimum.component';
import { HttpClientModule } from '@angular/common/http';
import { TypeproblemeService } from './probleme/typeprobleme.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProblemeData } from './probleme/probleme-data';
import { EmailMatcherComponent } from './shared/email-matcher/email-matcher.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemeComponent,
    AccueilComponent,

    LongueurMinimumComponent,
     EmailMatcherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    //HttpClientInMemoryWebApiModule .forRoot(ProblemeData, { delay: 1000 })
  ],
  providers: [TypeproblemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
