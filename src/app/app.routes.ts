import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
	{ 
		path: 'home', 
		component: BaseLayoutComponent,
		children: [
			{ path: 'dashboard', component: DashboardComponent },
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full'},
		]
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	}
];
