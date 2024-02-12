import {inject, Injectable} from '@angular/core';
import {Auth, authState, signInWithEmailAndPassword} from "@angular/fire/auth";
import {Credential} from "../models/Credential";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  readonly authState$ = authState(this.auth);

  constructor() { }

  logIn (credential: Credential) {
    return signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    )
  }

  logOut(): Promise<void> {
    console.log('logout')
    return this.auth.signOut();
  }
}
