import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AvatarModule} from "primeng/avatar";
import {ToolbarModule} from "primeng/toolbar";

// @ts-ignore
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, HttpClientModule, AvatarModule, ToolbarModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}
