import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './common/footer/footer.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MaterialModule} from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { RoomsListComponent } from './room/rooms-list/rooms-list.component';
import { RoomCreateComponent } from './room/room-create/room-create.component';
import { UserHeroComponent } from './user-hero/user-hero.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './common/card/card.component';
import { ListCardComponent } from './common/list-card/list-card.component';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    RoomsListComponent,
    RoomCreateComponent,
    UserHeroComponent,
    DashboardComponent,
    CardComponent,
    ListCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DateTimePickerModule,
    MaterialModule,
    HttpClientModule
  ],
  entryComponents: [LoginComponent,DashboardComponent,RoomsListComponent,RoomCreateComponent],

  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
