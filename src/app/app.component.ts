import {Component, ViewChild} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AvatarModule} from "primeng/avatar";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import {InputTextModule} from "primeng/inputtext";
import {MenuItem} from "primeng/api";
import {HomeComponent} from "./pages/home/home.component";

// @ts-ignore
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, HttpClientModule, AvatarModule, ToolbarModule, SplitButtonModule, InputTextModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Suppliers';
  items: MenuItem[] | undefined;

  @ViewChild(HomeComponent) private homeInstance: HomeComponent | undefined

  showDialogForNewSupplier(){
    this.homeInstance?.showDialogForNewSupplier();
  }

}
