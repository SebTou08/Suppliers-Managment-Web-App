import {Component, EventEmitter, inject, Output} from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {AuthService} from "../../core/services/auth.service";
import {routerInjection} from "../../core/guards";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  @Output() newSupplier = new EventEmitter()
  private authService = inject(AuthService)
  router = routerInjection()

  showDialogForNewSupplier(){
    this.newSupplier.emit();
  }

  async doLogout() {
    console.log('doing loging out')
    await this.authService.logOut();
    await this.router.navigateByUrl('login')
  }

}
