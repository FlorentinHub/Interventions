import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProblemeComponent } from './probleme/probleme.component';

@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    ProblemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'acceuil', component:AcceuilComponent},
      {path:'probleme', component:ProblemeComponent},
      { path:'', redirectTo:'acceuil', pathMatch:'full'},
      { path:'**', redirectTo:'acceuil', pathMatch:'full'}, //Si route est inexistante, elle retourne a l'acceuil
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
