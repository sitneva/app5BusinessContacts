import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import {AngularFirestore} from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {FirebaseService} from './services/firebase.service';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AngularFirestore, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
