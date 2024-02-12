import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";
import {routes} from "./app/app.routes";
import {provideRouter} from "@angular/router";
import {
  BrowserAnimationsModule,
  provideAnimations
} from "@angular/platform-browser/animations";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {environment} from "./enviroments/enviroment";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom([BrowserAnimationsModule, provideFirebaseApp(() => initializeApp(environment.firebaseConfig))]),
    importProvidersFrom(provideAuth(() => getAuth()))
  ]
})
  .catch((err) => console.error(err));
