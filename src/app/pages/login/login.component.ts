import {Component, inject} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../core/services/auth.service";
import {Credential} from "../../core/models/Credential";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, Validators
} from "@angular/forms";
import {LogInForm} from "../../core/models/LogInForm";
import {routerInjection} from "../../core/guards";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    RippleModule,
    InputTextModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  protected formBuilder = inject(FormBuilder);
  router = routerInjection()
  form: FormGroup<LogInForm> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    password: this.formBuilder.control('',{
      validators: Validators.required,
      nonNullable: true
    })
  })
  public credential: Credential = {email: "", password: ""}


  async doLogIn() {
    try {
      const credential: Credential = {
        email: this.form.value.email || '',
        password: this.form.value.password || ''
      }
      const response = await this.authService.logIn(credential);
      console.log({response})
      await this.router.navigateByUrl('/home')
    } catch (e) {
      console.log({e})
    }
  }

}
