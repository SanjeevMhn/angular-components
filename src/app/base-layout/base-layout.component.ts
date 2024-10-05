import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { SidenavComponent } from "../sidenav/sidenav.component";

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidenavComponent],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss'
})
export class BaseLayoutComponent {

}
