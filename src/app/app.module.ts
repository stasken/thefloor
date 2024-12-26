// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// Ionic
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// Storage
import { IonicStorageModule } from '@ionic/storage-angular';

import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [NativeAudio, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"thefloor-f3c32","appId":"1:531202419430:web:cf6077bd12ccd7fb546927","storageBucket":"thefloor-f3c32.firebasestorage.app","apiKey":"AIzaSyD_zm2bZL57GbKItj25uXAz5HskgyqqOOM","authDomain":"thefloor-f3c32.firebaseapp.com","messagingSenderId":"531202419430","measurementId":"G-EWHWKL6QB8"})), provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})
export class AppModule {}
